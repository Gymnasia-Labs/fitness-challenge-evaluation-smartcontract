import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { Concept2Service } from '../services/concept2.service';
import { selectChallengeById, selectConcept2DataLoading, selectTrainingData, selectTrainingsForChallenge } from '../ngrx/app.reducer';
import { TrainingData } from '../models/training.data';
import { merge } from 'rxjs';
import { fetchConcept2Data, setConcept2DataLoading } from '../ngrx/app.actions';

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

  logData$ = this.store.pipe(
    select(selectTrainingsForChallenge(-1))
  );

  concept2Loading$ = this.store.pipe(
    select(selectConcept2DataLoading)
  );

  clickedRow: TrainingData | undefined;

  displayedColumnsLog: string[] = [
    'date',
    // 'brand', 
    'type',
    'distance',
    'time',
    // 'pace', 
    // 'hearthRate'
  ];

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
   this.logData$ = this.store.pipe(
    select(selectTrainingsForChallenge(id))
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
    console.log(user);
    
    this.concept2.getUserData(user).subscribe(console.log)
  }

  getChallengeDataOf(user?:string){
    if(!user) user = 'me';
    user= '491';
    this.concept2.getResultsData(user).subscribe(console.log)
  }

  getStrokeData(user?:string, resultId?:string){
    if(!user) user = 'me';
    if(!resultId) resultId = '55327159'
    this.concept2.getStrokesData(user,resultId).subscribe(console.log)
  }

  getLoginLink(brand: string){
    return this.authService.getLoginLink(brand);
  }

  refresh() {
    this.store.dispatch(setConcept2DataLoading({isLoading:true}));
    this.store.dispatch({ type: fetchConcept2Data });

}

}
