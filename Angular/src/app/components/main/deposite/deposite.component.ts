import { Component, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserSignalService } from '../../../services/user-signal.service';
import { TransactionService } from '../../../services/transaction.service';
import { ButtonModule } from 'primeng/button';
import { AccountDTO } from '../../../models/AccountDto.model';
import { TransactionDto } from '../../../models/TransactionDto.model';
import { ResponseModel } from '../../../models/Response.model';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CurrencyPipe } from '@angular/common';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-deposite',
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
  templateUrl: './deposite.component.html',
  styleUrl: './deposite.component.css',
  host: { 'collision-id': 'DepositeComponent' },
  providers: [ConfirmationService],
})
export class DepositeComponent implements OnInit {
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
  DepositeMoney: number = 0;
  user$: Signal<AccountDTO | null>;
  TotalBalance: number = 0;
  Username: string | null;

  setAmountMoney = (amount: number) => (this.DepositeMoney = amount);
  DepositeAction(event: Event) {
    if (this.DepositeMoney <= 0) {
      this.toastr.warning('Deposit amount must be greater than zero');
      return;
    }
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.DepositeMoney.toString(),
      header: 'Deposite',
      accept: () => {
        const transactionModel: TransactionDto = {
          accId: this.user$().accId,
          transMoney: this.DepositeMoney,
          transType: 1,
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
