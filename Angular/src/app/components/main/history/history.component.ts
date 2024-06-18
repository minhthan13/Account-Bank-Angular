import { Component, OnDestroy, OnInit, Signal } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TransactionDto } from '../../../models/TransactionDto.model';
import { TransactionService } from '../../../services/transaction.service';
import { ResponseModel } from '../../../models/Response.model';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { UserSignalService } from '../../../services/user-signal.service';
import { AccountDTO } from '../../../models/AccountDto.model';
@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    TabViewModule,
    TableModule,
    CommonModule,
    TagModule,
    CalendarModule,
    FormsModule,
    FloatLabelModule,
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
  host: { 'collision-id': 'HistoryComponent' },
})
export class HistoryComponent implements OnInit, OnDestroy {
  constructor(
    private tranService: TransactionService,
    private userSignal: UserSignalService
  ) {
    this.user$ = this.userSignal.user$;
    this.userId = this.user$()?.accId;
  }
  ngOnInit(): void {
    if (this.userId != null) {
      this.tranService.GetTransactions(this.userId).then(
        (res: ResponseModel) => {
          if (res && res.data) {
            this.transactions = res.data as TransactionDto[];
            this.splitTransactionsByType();
          }
        },
        (err) => {
          console.log(err.error.message);
        }
      );
    }
  }
  ngOnDestroy(): void {
    this.transactions = [];
    this.deposites = [];
    this.withdraws = [];
  }
  user$: Signal<AccountDTO | null>;
  userId: number | null;
  transactions: TransactionDto[];
  deposites: TransactionDto[];
  withdraws: TransactionDto[];
  fromDate: Date | undefined;
  toDate: Date | undefined;

  dateChange(event: any) {
    let from: string = '';
    let to: string = '';
    if (this.fromDate != undefined) {
      from = this.formatDateToString(this.fromDate);
    }
    if (this.toDate != undefined) {
      to = this.formatDateToString(this.toDate);
    }

    this.tranService.FilterTransactionTime(from, to, this.userId).then(
      (res: ResponseModel) => {
        if (res && res.data) {
          this.transactions = res.data as TransactionDto[];
          this.splitTransactionsByType();
        }
      },
      (err) => {
        this.transactions = [];
        this.splitTransactionsByType();
      }
    );
  }
  ClearDate() {
    this.fromDate = undefined;
    this.toDate = undefined;
    this.ngOnInit();
  }
  private splitTransactionsByType(): void {
    this.deposites = this.filterTransactionsByType(1);
    this.withdraws = this.filterTransactionsByType(2);
  }

  private filterTransactionsByType(transType: 1 | 2): TransactionDto[] {
    return this.transactions.filter(
      (transaction) => transaction.transType === transType
    );
  }
  private formatDateToString(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }
}
