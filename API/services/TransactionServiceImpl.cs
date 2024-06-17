using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using API.entities;
using API.execeptions;
using API.models;
using Microsoft.EntityFrameworkCore;

namespace API.services
{
  public class TransactionServiceImpl : TransactionService
  {
    private readonly AccountBankContext db;
    public TransactionServiceImpl(AccountBankContext _db)
    {
      db = _db;
    }
    public async Task<List<TransactionDTO>> GetTransactionDTOs()
    {
      return await db.TransactionDetails
      .AsNoTracking()
      .OrderByDescending(t => t.TransId)
      .Select(t => new TransactionDTO(t))
      .ToListAsync();
    }



    public async Task<List<TransactionDTO>> GetTransactionTypeDTO(int typeId)
    {
      return await
       db.TransactionDetails.Where(t => t.TransType == typeId).Select(t => new TransactionDTO(t)).ToListAsync();
    }

    public async Task<List<TransactionDTO>> GetTransactionWithAccIdDTOs(int accId)
    {
      return await
       db.TransactionDetails.Where(t => t.AccId == accId).Select(t => new TransactionDTO(t)).ToListAsync();
    }

    public async Task Adding(TransactionDetail transactionDetail)
    {
      var account = await db.Accounts.FindAsync(transactionDetail.AccId);
      if (account is null) throw new NotFoundException("account not found");
      try
      {
        if (transactionDetail.TransType == 1)
        {
          account.Balance += transactionDetail.TransMoney;
        }
        else if (transactionDetail.TransType == 2)
        {
          account.Balance -= transactionDetail.TransMoney;
        }

        db.Entry(account).State = EntityState.Modified;
        transactionDetail.DateOfTrans = DateTime.Now;
        await db.AddAsync(transactionDetail);
        await db.SaveChangesAsync();
      }
      catch
      {
        string message = transactionDetail.TransType switch
        {
          1 => "Deposite failed",
          2 => "Withdraw failed",
          _ => "Transaction failed"
        };
        throw new BadRequestException(400, message);
      }


    }

    public async Task Delete(int TransId)
    {
      var transaction = await db.TransactionDetails.FindAsync(TransId);
      if (transaction is null) throw new NotFoundException(nameof(TransactionDetail), TransId);
      try
      {

        db.Remove(transaction);
        await db.SaveChangesAsync();
      }
      catch
      {
        throw new BadRequestException(400, "Delete Transaction failed");
      }
    }

    public async Task Update(TransactionDTO transactionDTO)
    {
      var tran = await db.TransactionDetails.FindAsync(transactionDTO.transId);
      if (tran is null) throw new NotFoundException(nameof(TransactionDetail), transactionDTO.transId);
      try
      {
        tran.AccId = transactionDTO.accId;
        tran.TransMoney = transactionDTO.transMoney;
        tran.TransType = transactionDTO.transType;
        tran.DateOfTrans = DateTime.ParseExact("dd/MM/yyyy", transactionDTO.dateOfTrans, CultureInfo.InvariantCulture);
        db.Entry(tran).State = EntityState.Modified;
        await db.SaveChangesAsync();
      }
      catch
      {
        throw new BadRequestException(400, "update transaction failed");
      }
    }
  }
}