import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchChallenges } from '../ngrx/app.actions';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  title: string = '';
  desc: string = '';
  start: number = 0;
  end: number = 0;
  count: number = 2;
  price: number = 0;

  constructor(
    private contractService: ContractService,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  saveChallenge() {
    console.log(this.title, this.desc, this.start, this.end, this.count, this.price);
    let unixStart = Math.floor(new Date(this.start).valueOf() / 1000);
    let unixEnd = Math.floor(new Date(this.end).valueOf() / 1000);
    this.contractService
      .createChallenge(this.title, this.desc, unixStart, unixEnd, this.count, this.price)
      .subscribe(() =>this.store.dispatch({ type: fetchChallenges }));
    
  }

  fetchChallenges() {
    this.store.dispatch({ type: fetchChallenges });
  }

}
