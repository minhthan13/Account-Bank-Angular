using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.entities;
using API.models;

namespace API.services
{
  public interface AccountService
  {
    Task<Account> Login(AccountRequest account);
    Task Register(Account account);

    Task<List<Account>> GetAccounts();
    Task<List<AccountDTO>> GetAccountsDTO();
    Task<AccountDTO> GetAccountIdDTO(int id);
    Task<Account> GetAccountId(int id);
    Task<AccountDTO> GetAccountUsernameDTO(string username);
    Task<Account> GetAccountUsername(string username);
    public bool ExistUsername(string username);
    public bool ExistEmail(string email);
    public bool ExistPhone(string phone);

    public bool VerifyPassword(AccountRequest account);

  }
}