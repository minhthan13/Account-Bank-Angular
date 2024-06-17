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
}
