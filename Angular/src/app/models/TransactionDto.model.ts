export interface TransactionDto {
  transId?: number;
  accId: number;
  transMoney: number;
  transType: 1 | 2;
  dateOfTrans?: string;
}
