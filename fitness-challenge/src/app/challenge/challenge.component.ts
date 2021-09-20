import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { Concept2Service } from '../services/concept2.service';
import { selectChallengeById, selectConcept2DataLoading, selectDisplayedChallenge, selectTrainingData, selectTrainingsForDisplayedChallenge } from '../ngrx/app.reducer';
import { TrainingData } from '../models/training.data';
import { merge } from 'rxjs';
import { fetchChallenges, fetchConcept2Data, setConcept2DataLoading, setDisplayedChallenge } from '../ngrx/app.actions';
import { DomSanitizer } from '@angular/platform-browser';
import { ContractService } from '../services/contract.service';
import { filter, take, tap } from 'rxjs/operators';
import { Challenge } from '../models/challenge';


export interface PeriodicElement {
  distance: string,
  time: string,
  account: string
}

export const CHALLENGE_ID: string = 'challenge_id';

const ELEMENT_DATA: PeriodicElement[] = [
  { distance: '1500m', time: '3:21 secs', account: 'Account #0001', },
  { distance: '1500m', time: '3:34 secs', account: 'Account #0002', },
  { distance: '1500m', time: '3:57 secs', account: 'Account #0003', },
];

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})

export class ChallengeComponent implements OnInit {
  safeURL: any;

  dataSource$ = ELEMENT_DATA;
  id: number = -1;

  logData$ = this.store.pipe(
    select(selectTrainingsForDisplayedChallenge)
  );

  concept2Loading$ = this.store.pipe(
    select(selectConcept2DataLoading)
  );

  clickedRow: TrainingData | undefined;

  displayedColumnsLog: string[] = [
    // 'submit',
    'date',
    // 'brand', 
    'type',
    'distance',
    'time',
    // 'pace', 
    // 'hearthRate',
    'submit'
  ];

  challenge$ = this.store.pipe(
    select(selectDisplayedChallenge)
  );

  constructor(
    private actRoute: ActivatedRoute,
    private store: Store,
    private authService: AuthService,
    private concept2: Concept2Service,
    private _sanitizer: DomSanitizer,
    private contractService: ContractService
  ) {
    // this.store.dispatch({ type: fetchChallenges });
    this.id = +this.actRoute.snapshot.params.id;
    this.store.dispatch(setDisplayedChallenge({ id: this.id }));
    this.logData$  =  this.store.pipe(
      select(selectTrainingsForDisplayedChallenge)
    );
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://youtu.be/dQw4w9WgXcQ');
  }

  ngOnInit(): void {
  }

  loginConcept2() {
    // this.authService.login().subscribe(
    //   r => console.log('res',r)
    // );
  }

  getUserDataOf(user?: string) {
    if (!user) user = 'me';

    this.concept2.getUserData(user).subscribe(console.log)
  }

  getChallengeDataOf(user?: string) {
    if (!user) user = 'me';
    user = '491';
    this.concept2.getResultsData(user).subscribe(console.log)
  }

  getStrokeData(user?: string, resultId?: string) {
    if (!user) user = 'me';
    if (!resultId) resultId = '55327159'
    this.concept2.getStrokesData(user, resultId).subscribe(console.log)
  }

  getLoginLink(brand: string) {
    return this.authService.getLoginLink(brand);
  }

  refresh() {
    this.store.dispatch(setConcept2DataLoading({ isLoading: true }));
    this.store.dispatch({ type: fetchConcept2Data });

  }

  saveChallengeId() {
    localStorage.setItem(CHALLENGE_ID, '' + this.id);
  }

  submit(element: any) {
    console.log(element);
    this.contractService.submitChallenge(this.id, element.distance, element.time);
  }

}
