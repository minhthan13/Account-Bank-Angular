import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserSignalService } from '../../../services/user-signal.service';
import { TransactionService } from '../../../services/transaction.service';
import { ButtonModule } from 'primeng/button';
import { AccountDTO } from '../../../models/AccountDto.model';
import { TransactionDto } from '../../../models/TransactionDto.model';
import { ResponseModel } from '../../../models/Response.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deposite',
  standalone: true,
  imports: [FormsModule, ButtonModule],
  templateUrl: './deposite.component.html',
  styleUrl: './deposite.component.css',
  host: { 'collision-id': 'DepositeComponent' },
})
export class DepositeComponent implements OnInit {
  DepositeAction() {
    let user$: AccountDTO = this.userSignal.getUserSignal;
    const transactionForm: TransactionDto = {
      accId: user$.accId,
      transMoney: this.DepositeMoney,
      transType: 1,
    };
    console.log('>>> check transaction :', transactionForm);
    let formDeposite = new FormData();
    formDeposite.append('transaction', JSON.stringify(transactionForm));

    this.transService.TransactionAction(formDeposite).then(
      (res: ResponseModel) => {
        if (res && res.code == 200) {
          this.userSignal.setUserSignal(res.data as AccountDTO);
          this.toastr.success(res.message);
        }
      },
      (err) => {
        if (err.error) {
          this.toastr.error(err.error.message);
        }
      }
    );
  }
  constructor(
    private userSignal: UserSignalService,
    private transService: TransactionService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}
  DepositeMoney: number = 200;
}
