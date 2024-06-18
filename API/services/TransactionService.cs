using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.entities;
using API.models;
using Microsoft.Identity.Client;

namespace API.services
{
  public interface TransactionService
  {
    Task<List<TransactionDTO>> GetTransactionDTOs();
    Task<List<TransactionDTO>> GetTransactionTypeDTO(int typeId);
    Task<List<TransactionDTO>> GetTransactionWithAccIdDTOs(int accId);
    Task<List<TransactionDTO>> GetTransactionWithTimeDTOs(DateTime from, DateTime to, int accId);
    Task<List<TransactionDTO>> GetTransactionWithNowTimeDTOs(DateTime date, int accId);

    Task Adding(TransactionDetail transactionDetail);
    Task Update(TransactionDTO transactionDTO);
    Task Delete(int id);

  }
}