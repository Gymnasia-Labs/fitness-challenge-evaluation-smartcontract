import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../models/challenge';

@Component({
  selector: 'app-challenge-detail',
  templateUrl: './challenge-detail.component.html',
  styleUrls: ['./challenge-detail.component.scss']
})
export class ChallengeDetailComponent implements OnInit {

  constructor() { }

  @Input() challenge: Challenge| null = null ;

  ngOnInit(): void {
  }

}
