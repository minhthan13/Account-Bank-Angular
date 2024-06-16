using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.entities;

namespace API.models
{
  public class AccountDTO
  {
    public int accId { get; set; }
    public string? username { get; set; }
    public string? password { get; set; }
    public string? fullName { get; set; }
    public string? email { get; set; }
    public string? phone { get; set; }
    public double balance { get; set; }
    public AccountDTO(Account account)
    {
      accId = account.AccId;
      username = account.Username;
      password = "";
      fullName = account.FullName;
      email = account.Email;
      phone = account.Phone;
      balance = account.Balance;
    }
    public AccountDTO() { }

  }
}