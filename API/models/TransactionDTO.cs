using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.entities;

namespace API.models
{
  public class TransactionDTO
  {
    public int transId { get; set; }
    public int accId { get; set; }
    public double transMoney { get; set; }
    public int transType { get; set; }
    public string dateOfTrans { get; set; }
    public TransactionDTO(TransactionDetail transactionDetail)
    {
      transId = transactionDetail.TransId;
      accId = transactionDetail.AccId;
      transMoney = transactionDetail.TransMoney;
      transType = transactionDetail.TransType;
      dateOfTrans = transactionDetail.DateOfTrans.ToString("dd/MM/yyyy");

    }
    public TransactionDTO() { }

  }
}