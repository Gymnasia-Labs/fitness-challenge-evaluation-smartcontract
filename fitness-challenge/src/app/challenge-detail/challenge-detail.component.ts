import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
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

}
