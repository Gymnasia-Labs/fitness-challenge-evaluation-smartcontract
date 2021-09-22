import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Challenge, LeaderBoard } from '../models/challenge';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  @Output() redeemPrice = new EventEmitter();
  constructor() { }

  displayedColumns: string[] = [
    // 'distance',
    'time',
    'account'];

  @Input() dataSource: LeaderBoard[] = [];

  ngOnInit(): void {
   
  }

  getFormatedTime(time: number) {
    let mins = Math.floor(time / 600);
    let secs = Math.floor((time % 600) / 10);
    let deciSecs = (time % 6);
    if(secs < 10)
    return `${mins}:0${secs}:${deciSecs}`
    else
    return `${mins}:${secs}:${deciSecs}`
  }

  getPrice(){
    this.redeemPrice.emit();
  }

}
