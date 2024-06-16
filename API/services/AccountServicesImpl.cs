using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.entities;
using API.execeptions;
using API.models;
using Microsoft.EntityFrameworkCore;

namespace API.services
{
  public class AccountServicesImpl : AccountService
  {
    private readonly AccountBankContext db;
    public AccountServicesImpl(AccountBankContext _db)
    {
      db = _db;
    }
    public Task<List<Account>> GetAccounts()
    {
      return db.Accounts.OrderByDescending(a => a.AccId).ToListAsync();
    }
    public async Task<List<AccountDTO>> GetAccountsDTO()
    {
      return await db.Accounts.AsNoTracking()
      .OrderByDescending(a => a.AccId)
      .Select(a => new AccountDTO(a))
      .ToListAsync();
    }

    public async Task<Account> GetAccountId(int id)
    {
      var account = await db.Accounts.FindAsync(id);
      if (account == null)
      {
        throw new NotFoundException(nameof(Account), id);
      }
      else
      {
        return account;
      }
    }
    public async Task<AccountDTO> GetAccountIdDTO(int id)
    {
      var account = await db.Accounts.FindAsync(id);
      if (account == null)
      {
        throw new NotFoundException(nameof(Account), id);
      }
      else
      {
        return new AccountDTO(account);
      }
    }





    public async Task<Account> GetAccountUsername(string username)
    {

      var account = await db.Accounts.SingleOrDefaultAsync(a => a.Username == username);
      if (account == null)
      {
        throw new NotFoundException(nameof(Account), username);
      }
      else
      {
        return account;
      }
    }
    public async Task<AccountDTO> GetAccountUsernameDTO(string username)
    {
      var account = await db.Accounts.SingleOrDefaultAsync(a => a.Username == username);
      if (account == null)
      {
        throw new NotFoundException(nameof(Account), username);
      }
      else
      {
        return new AccountDTO(account);
      }
    }

    public async Task<Account> Login(AccountRequest account)
    {

      var user = db.Accounts.SingleOrDefault(a => a.Username == account.username);
      if (user == null) throw new NotFoundException(nameof(Account), account.username);
      if (VerifyPassword(account)) throw new BadRequestException(401, "password invalid");
      return user;

    }

    public async Task Register(Account account)
    {

      await db.AddAsync(account);
      await db.SaveChangesAsync();


    }


    public bool ExistUsername(string username)
    {
      return db.Accounts.Any(a => a.Username == username);
    }
    public bool VerifyPassword(AccountRequest account)
    {
      Account user = db.Accounts.SingleOrDefault(a => a.Username == account.username);
      return !BCrypt.Net.BCrypt.Verify(account.password, user.Password);
    }

    public bool ExistEmail(string email)
    {
      return db.Accounts.Any(a => a.Email == email);
    }

    public bool ExistPhone(string phone)
    {
      return db.Accounts.Any(a => a.Phone == phone);
    }
  }
}