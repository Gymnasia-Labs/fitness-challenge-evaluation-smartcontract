import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { select, Store } from '@ngrx/store';
import { fetchChallenges } from '../ngrx/app.actions';
import {
  AppState,
  selectChallenges,
  selectEndedChallenges,
  selectLiveChallenges,
  selectUpcomingChallenges,
} from '../ngrx/app.reducer';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss'],
})
export class ChallengesComponent implements OnInit {
  constructor(public store: Store<AppState>) {}
  challenges$ = this.store.pipe(
    // select(selectChallenges)
    select(selectUpcomingChallenges)
  );
  ngOnInit(): void {
    this.store.dispatch({ type: fetchChallenges });
  }

  changeChallenges(type: MatTabChangeEvent) {
    let challengeSelect;
    switch (type.index) {
      case 0:
        challengeSelect = selectUpcomingChallenges;
        break;
      case 1:
        challengeSelect = selectLiveChallenges;
        break;
      case 2:
        challengeSelect = selectEndedChallenges;
        break;
      default:
        console.error('invalid tab change');
        challengeSelect = selectUpcomingChallenges;
        break;
    }
    this.challenges$ = this.store.pipe(select(challengeSelect));
  }
}
