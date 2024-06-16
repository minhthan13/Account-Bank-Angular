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

      var user = await db.Accounts.SingleOrDefaultAsync(a => a.Username == account.username);
      if (user == null) throw new NotFoundException(nameof(Account), account.username);
      if (VerifyPassword(account)) throw new BadRequestException(401, "password invalid");
      return user;

    }

    public async Task Register(Account account)
    {
      await db.AddAsync(account);
      await db.SaveChangesAsync();
    }

    public async Task Update(AccountDTO account)
    {
      var acc = await db.Accounts.FindAsync(account.accId);
      if (acc is null) throw new NotFoundException(nameof(Account), account.accId);
      if (account.username != acc.Username && ExistUsername(account.username)) throw new BadRequestException(404, $"Username: {account.username} alredy exits !");
      if (account.email != acc.Email && ExistEmail(account.email)) throw new BadRequestException(404, $"Email: {account.email} alredy exits !");
      if (account.phone != acc.Phone && ExistPhone(account.phone)) throw new BadRequestException(404, $"Phone Number: {account.phone} alredy exits !");
      try
      {
        acc.Username = account.username;
        acc.Password = !string.IsNullOrEmpty(account.password) ? BCrypt.Net.BCrypt.HashPassword(account.password) : acc.Password;
        acc.FullName = account.fullName;
        acc.Email = account.email;
        acc.Phone = account.phone;
        db.Entry(acc).State = EntityState.Modified;
        await db.SaveChangesAsync();
      }
      catch
      {
        throw new BadRequestException(400, "update account failed");
      }
    }

    public async Task Delete(int id)
    {
      var account = await db.Accounts.FindAsync(id);
      if (account is null) throw new NotFoundException(nameof(Account), id);
      try
      {

        db.Remove(account);
        await db.SaveChangesAsync();
      }
      catch
      {
        throw new BadRequestException(400, "delete account failed");
      }
    }
    #region  Helper Methods
    public bool ExistUsername(string username)
    {
      return db.Accounts.Any(a => a.Username == username);
    }
    public bool VerifyPassword(AccountRequest account)
    {
      Account user = db?.Accounts?.SingleOrDefault(a => a.Username == account.username);
      return !BCrypt.Net.BCrypt.Verify(account.password, user?.Password);
    }

    public bool ExistEmail(string email)
    {
      return db.Accounts.Any(a => a.Email == email);
    }

    public bool ExistPhone(string phone)
    {
      return db.Accounts.Any(a => a.Phone == phone);
    }
    #endregion
  }
}