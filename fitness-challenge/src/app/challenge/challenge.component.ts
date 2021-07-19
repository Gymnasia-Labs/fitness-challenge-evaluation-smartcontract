import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { Concept2Service } from '../concept2.service';
import { selectChallengeById } from '../ngrx/app.reducer';

export interface PeriodicElement {
  distance: string,
  time: string,
  account: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {distance: '1500m', time: '3:21 secs', account: 'Account #0001', },
  {distance: '1500m', time: '3:34 secs', account: 'Account #0002', },
  {distance: '1500m', time: '3:57 secs', account: 'Account #0003', },
];

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})

export class ChallengeComponent implements OnInit {

  displayedColumns: string[] = ['distance', 'time', 'account'];
  dataSource = ELEMENT_DATA;

  challenge$ = this.store.pipe(
    select(selectChallengeById(-1))
  );

  constructor(
    private actRoute: ActivatedRoute, 
    private store: Store,
    private authService: AuthService,
    private concept2: Concept2Service
    ) {
    let id = +this.actRoute.snapshot.params.id;
    this.challenge$ = this.store.pipe(
      select(selectChallengeById(id))
      );
   }

  ngOnInit(): void {
  }

  loginConcept2(){
    // this.authService.login().subscribe(
    //   r => console.log('res',r)
    // );
  }

  getUserDataOf(user?:string){
    if(!user) user = 'me';
    this.concept2.getUserData(user).subscribe(console.log)
  }

  getChallengeDataOf(user?:string){
    if(!user) user = 'me';
    this.concept2.getResultsData(user).subscribe(console.log)
  }

  getStrokeData(user?:string, resultId?:string){
    if(!user) user = 'me';
    resultId = '55327159'
    this.concept2.getStrokesData(user,resultId).subscribe(console.log)
  }

}
