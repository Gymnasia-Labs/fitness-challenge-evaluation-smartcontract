import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ethers } from 'ethers';
import { CHALLENGE_ID } from '../challenge/challenge.component';
import { Challenge } from '../models/challenge';
import { selectConcept2Name } from '../ngrx/app.reducer';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-challenge-detail',
  templateUrl: './challenge-detail.component.html',
  styleUrls: ['./challenge-detail.component.scss']
})
export class ChallengeDetailComponent implements OnInit {

  public progressBarValue: number = 0;

  constructor(private store: Store,
    private authService: AuthService,
    
    ) {
     
    }

  @Input() challenge: Challenge| null = null ;
  @Input() joinActive: boolean = false ;

  concept2Name$ = this.store.pipe(
    select(selectConcept2Name)
  );


  ngOnInit(): void {
    this.progressBarValue = this.calculateProgressbarLevel();
  }

  isLive(){
    let now = new Date();
    if(this.challenge) return now >= this.challenge?.start && now <= this.challenge?.end;
    return false;
  }

  getLoginURL(brand:string){
    return this.authService.getLoginLink(brand);
  }

  saveChallengeId(){
    localStorage.setItem(CHALLENGE_ID, ''+ this.challenge?.id);
  }

  calculateProgressbarLevel() {
    let start = this.challenge?.start.valueOf();
    let end = this.challenge?.end.valueOf();
    let now = new Date().valueOf();
    if(!start || ! end) return 0;
    if(now < start ) return 0; 
    return (now - start) / ( end - start ) *100 ;
  }

  formatEther(wei:string|undefined){
    if(wei)
    return ethers.utils.formatEther(wei);
    return 0;
  }

}
