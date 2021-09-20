import { Component, Input, OnInit } from '@angular/core';
import { Challenge, LeaderBoard } from '../models/challenge';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

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
    let secs = (time % 600) / 10;
    if(secs < 10)
    return `${mins}:0${secs}`
    else
    return `${mins}:${secs}`
  }

}
