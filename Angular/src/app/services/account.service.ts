import { Injectable } from '@angular/core';
import { AccountDTO } from '../models/AccountDto.model';
import { ENVIROMENT } from '../shared/enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}
  baseUrl = ENVIROMENT.API_URL;
  END_POINT = ENVIROMENT.END_POINT.AUTH;
  register(formRegister: FormData) {
    return lastValueFrom(
      this.httpClient.post(this.baseUrl + this.END_POINT.REGISTER, formRegister)
    );
  }

  login(account: AccountDTO) {
    return lastValueFrom(
      this.httpClient.post(this.baseUrl + this.END_POINT.LOGIN, account)
    );
  }
  edit(account: AccountDTO) {
    return lastValueFrom(
      this.httpClient.put(this.baseUrl + this.END_POINT.EDIT, account)
    );
  }
}
