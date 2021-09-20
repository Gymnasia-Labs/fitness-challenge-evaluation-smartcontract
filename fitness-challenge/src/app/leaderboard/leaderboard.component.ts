import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../models/challenge';

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

  @Input() dataSource: Challenge[] = [];

  ngOnInit(): void {
  }

}
