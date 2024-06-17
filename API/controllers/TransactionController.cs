using System;
using System.Collections.Generic;
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

    public async Task<IActionResult> GetTransactions()
    {
      try
      {
        return Ok(await transactionService.GetTransactionDTOs());
      }
      catch
      {
        return BadRequest();
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
      catch
      {
        return BadRequest();
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