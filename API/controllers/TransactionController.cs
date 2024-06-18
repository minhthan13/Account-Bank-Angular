using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using API.entities;
using API.execeptions;
using API.models;
using API.services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace API.controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class TransactionController : ControllerBase
  {
    private readonly TransactionService transactionService;
    private readonly AccountService accountService;

    public TransactionController(TransactionService _transactionService, AccountService _accountService)
    {
      transactionService = _transactionService;
      accountService = _accountService;
    }

    [HttpGet("getTransactions")]
    [Produces("application/json")]

    public async Task<IActionResult> GetTransactions(int accID)
    {
      try
      {
        var transactions = await transactionService.GetTransactionWithAccIdDTOs(accID);
        return Ok(new ResponseData(200, "get transactions success", transactions));
      }
      catch (NotFoundException ex)
      {
        return NotFound(new ErrorResponse(404, ex.Message));
      }
    }


    [HttpGet("getTransactionType")]
    [Produces("application/json")]

    public async Task<IActionResult> GetTransactionTypeDTO(int transType)
    {
      try
      {
        return Ok(await transactionService.GetTransactionTypeDTO(transType));
      }
      catch (NotFoundException ex)
      {
        return NotFound(new ErrorResponse(404, ex.Message));
      }
    }

    [HttpGet("findTransactionTime")]
    [Produces("application/json")]

    public async Task<IActionResult> FindTransactionTimeDTO(string? from, string? to, int accId)
    {
      try
      {
        List<TransactionDTO> transactionDTOs = [];
        DateTime todate = to != null ? DateTime.ParseExact(to, "dd/MM/yyyy", CultureInfo.InvariantCulture) : DateTime.Now;
        if (from == null)
        {
          transactionDTOs = await transactionService.GetTransactionWithNowTimeDTOs(todate, accId);
        }
        else
        {
          DateTime fromdate = DateTime.ParseExact(from, "dd/MM/yyyy", CultureInfo.InvariantCulture);
          transactionDTOs = await transactionService.GetTransactionWithTimeDTOs(fromdate, todate, accId);
        }

        return Ok(new ResponseData(200, "get transactions", transactionDTOs));
      }
      catch (NotFoundException ex)
      {
        return NotFound(new ErrorResponse(404, ex.Message));
      }
    }

    [HttpPost("transaction")]
    [Produces("application/json")]
    public async Task<IActionResult> Transaction([FromForm] string transaction)
    {
      try
      {
        var setting = new JsonSerializerSettings();
        setting.Converters.Add(new IsoDateTimeConverter()
        {
          DateTimeFormat = "dd/MM/yyyy"
        });
        TransactionDetail trans = JsonConvert.DeserializeObject<TransactionDetail>(transaction, setting);

        var message = "";
        if (trans.TransType == 1)
        {
          message = "Deposite Successfully";
        }
        else if (trans.TransType == 2)
        {
          message = "Withdraw Successfully";
        }
        await transactionService.Adding(trans);
        var dataRes = await accountService.GetAccountIdDTO(trans.AccId);

        return Ok(new ResponseData(200, message, dataRes));
      }
      catch (BadRequestException ex)
      {
        return BadRequest(new ErrorResponse(400, ex.Message));
      }
    }
  }
}