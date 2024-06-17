import { Component, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { UserSignalService } from '../../../services/user-signal.service';
import { TransactionService } from '../../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { AccountDTO } from '../../../models/AccountDto.model';
import { ResponseModel } from '../../../models/Response.model';
import { TransactionDto } from '../../../models/TransactionDto.model';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    FieldsetModule,
    AvatarModule,
    CardModule,
    ChipModule,
    InputTextModule,
    InputNumberModule,
    ConfirmDialogModule,
    CurrencyPipe,
  ],
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css',
  host: { 'collision-id': 'WithdrawComponent' },
  providers: [ConfirmationService],
})
export class WithdrawComponent implements OnInit {
  constructor(
    private userSignal: UserSignalService,
    private transService: TransactionService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.user$ = this.userSignal.user$;
    if (this.user$ != null) {
      this.TotalBalance = this.user$()?.balance;
      this.Username = this.user$()?.username;
    }
    console.log(this.user$());
  }

  private WithdrawMoney: number = 0;
  user$: Signal<AccountDTO | null>;
  TotalBalance: number = 0;
  Username: string | null = '';
  setAmountMoney = (amount: number) => {
    if (amount > this.TotalBalance) {
      this.toastr.warning(
        'Amount exceeds available balance. Adjusting to maximum allowable amount.'
      );
      this.WithdrawMoney = this.TotalBalance;
    } else {
      this.WithdrawMoney = amount;
    }
  };

  get _withdrawMoney(): number {
    return this.WithdrawMoney;
  }
  set _withdrawMoney(value: number) {
    if (value > this.TotalBalance) {
      this.toastr.warning(
        'Amount exceeds available balance. Adjusting to maximum allowable amount.'
      );
      this.WithdrawMoney = this.TotalBalance;
    } else {
      this.WithdrawMoney = value;
    }
  }
  WithdrawAction(event: Event) {
    if (this._withdrawMoney <= 0) {
      this.toastr.warning('The withdrawal amount must be greater than zero');
      return;
    }
    if (this._withdrawMoney > this.TotalBalance) {
      this.toastr.error('Insufficient balance');
      return;
    }
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this._withdrawMoney.toString(),
      header: 'Withdraw',
      accept: () => {
        const transactionModel: TransactionDto = {
          accId: this.user$().accId!,
          transMoney: this.WithdrawMoney,
          transType: 2,
        };
        console.log('>>> check transaction :', transactionModel);
        const formDeposite = new FormData();
        formDeposite.append('transaction', JSON.stringify(transactionModel));
        this.transService.TransactionAction(formDeposite).then(
          (res: ResponseModel) => {
            if (res && res.code == 200) {
              this.userSignal.setUserSignal(res.data as AccountDTO);
              this.toastr.success(res.message);
              this.setAmountMoney(0);
              this.ngOnInit();
            }
          },
          (err) => {
            if (err.error) {
              this.toastr.error(err.error.message);
            }
          }
        );
      },
      reject: () => {
        this.setAmountMoney(0);
      },
    });
  }
}
