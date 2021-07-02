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
  @Input() joinActive: boolean = false ;


  ngOnInit(): void {
  }

  isLive(){
    let now = new Date();
    if(this.challenge) return now >= this.challenge?.start && now <= this.challenge?.end;
    return false;
  }

}
