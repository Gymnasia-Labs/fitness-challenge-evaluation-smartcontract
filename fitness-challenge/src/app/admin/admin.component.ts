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
  price: string = '';
  meters: number = 1000;
  startTime: string = '';
  endTime: string = '';

  constructor(
    private contractService: ContractService,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  saveChallenge() {
    console.log(this.startTime);
    
    console.log(this.title, this.desc, this.start, this.end, this.count, this.price);
    let start = new Date(this.start);
    start.setHours(+this.startTime.slice(0,2));
    start.setMinutes(+this.startTime.slice(3,5))
    let unixStart = Math.floor(start.valueOf() / 1000);

    let end = new Date(this.end);
    end.setHours(+this.endTime.slice(0,2));
    end.setMinutes(+this.endTime.slice(3,5));
    let unixEnd = Math.floor(end.valueOf() / 1000);
    
    this.contractService
      .createChallenge(this.title, this.desc, unixStart, unixEnd, this.count, this.price, this.meters)
      .subscribe(() =>this.store.dispatch({ type: fetchChallenges }));
    
  }

  fetchChallenges() {
    this.store.dispatch({ type: fetchChallenges });
  }

}
