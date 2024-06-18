import { Injectable } from '@angular/core';
import { ENVIROMENT } from '../shared/enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private httpClient: HttpClient) {}
  baseUrl = ENVIROMENT.API_URL;
  END_POINT = ENVIROMENT.END_POINT.TRANSACTION;
  TransactionAction(FormTransaction: FormData) {
    return lastValueFrom(
      this.httpClient.post(
        this.baseUrl + this.END_POINT.TRANSACTION_ACTION,
        FormTransaction
      )
    );
  }

  GetTransactions(userId: number) {
    return lastValueFrom(
      this.httpClient.get(this.baseUrl + this.END_POINT.GET_TRANSACTIONS, {
        params: { accID: userId },
      })
    );
  }
  FilterTransactionTime(fromDate: string, toDate: string, userId: number) {
    return lastValueFrom(
      this.httpClient.get(
        this.baseUrl + this.END_POINT.FILTER_TIME_TRANSACTIONS,
        {
          params: { from: fromDate, to: toDate, accId: userId },
        }
      )
    );
  }
}
