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
  public class AccountController : ControllerBase
  {

    private readonly AccountService accountService;
    public AccountController(AccountService _accountService)
    {
      accountService = _accountService;
    }

    [HttpPost("login")]
    [Produces("application/json")]
    [Consumes("application/json")]
    public async Task<IActionResult> Login([FromBody] AccountRequest account)
    {
      try
      {
        var user = await accountService.Login(account);
        return Ok(new AccountDTO(user));
      }
      catch (Exception ex)
      {
        var errorMessage = new ValidateError(400, new List<string> { ex.Message });
        return BadRequest(errorMessage);
      }
    }
    [HttpPost("register")]
    [Produces("application/json")]
    public async Task<IActionResult> Register([FromForm] string account)
    {
      try
      {
        var setting = new JsonSerializerSettings();
        setting.Converters.Add(new IsoDateTimeConverter()
        {
          DateTimeFormat = "dd/MM/yyyy"
        });
        Account user = JsonConvert.DeserializeObject<Account>(account, setting);
        if (accountService.ExistUsername(user.Username)) return BadRequest(new ErrorResponse(400, "user name alredy exists !!"));
        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        await accountService.Register(user);
        return Ok("register account successfully");
      }
      catch (Exception ex)
      {
        var errorMessage = new ValidateError(400, new List<string> { ex.Message });
        return BadRequest(errorMessage);
      }
    }

    [HttpGet("getAccounts")]
    [Produces("application/json")]
    public async Task<IActionResult> GetAccounts()
    {
      try
      {
        var accounts = await accountService.GetAccountsDTO();
        return Ok(accounts);
      }
      catch (Exception ex)
      {
        return BadRequest(new ValidateError(400, new List<string> { ex.Message }));
      }
    }

    [HttpGet("getAccountId")]
    [Produces("application/json")]
    public async Task<IActionResult> GetAccountId(int id)
    {
      try
      {
        var account = await accountService.GetAccountIdDTO(id);
        return Ok(account);
      }
      catch (Exception ex)
      {
        return BadRequest(new ValidateError(400, new List<string> { ex.Message }));
      }
    }

    [Produces("application/json")]
    [HttpGet("getAccountUsername")]
    public async Task<IActionResult> GetAccountUsername(string username)
    {
      try
      {
        var account = await accountService.GetAccountUsernameDTO(username);
        return Ok(account);
      }
      catch (Exception ex)
      {
        return BadRequest(new ValidateError(400, new List<string> { ex.Message }));
      }
    }
  }
}