import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectTransactionError, selectTransactionHash, selectTransactionLoading } from '../ngrx/app.reducer';

@Component({
  selector: 'app-transaction-loading-dialog',
  templateUrl: './transaction-loading-dialog.component.html',
  styleUrls: ['./transaction-loading-dialog.component.scss']
})
export class TransactionLoadingDialogComponent implements OnInit {

  transactionLoading$ = this.store.pipe(select(selectTransactionLoading));
  transactionError$ = this.store.pipe(select(selectTransactionError));
  transactionHash$ = this.store.pipe(select(selectTransactionHash));


  constructor(private store: Store) { }

  ngOnInit(): void {
    this.transactionError$.subscribe(console.log)
  }

  getTransactionLink(tx: string): string {
    return `https://rinkeby.etherscan.io/tx/${tx}`;
  }

}
