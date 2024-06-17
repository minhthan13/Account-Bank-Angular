import { Injectable, Signal, signal } from '@angular/core';
import { AccountDTO } from '../models/AccountDto.model';
import { ENVIROMENT } from '../shared/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UserSignalService {
  constructor() {
    let userStorage: AccountDTO;
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem(ENVIROMENT.USER_STORAGE);
      if (storedUser) {
        try {
          userStorage = JSON.parse(storedUser);
          this.user.set(userStorage);
        } catch (e) {
          console.error('Error parsing stored user from localStorage', e);
        }
      }
    }
  }

  private user = signal<AccountDTO | null>(null);
  readonly user$: Signal<AccountDTO | null> = this.user;

  setUserSignal(user: AccountDTO) {
    this.user.set(user);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(ENVIROMENT.USER_STORAGE, JSON.stringify(user));
    }
  }

  get getUserSignal(): AccountDTO {
    return this.user$();
  }
  clearUser() {
    this.user.set(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(ENVIROMENT.USER_STORAGE);
    }
  }
}
