import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState, selectChallenges } from '../ngrx/app.reducer';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {

  constructor( public store : Store<AppState>) { }
  challenges$ = this.store.pipe(
    select(selectChallenges)
  );
  ngOnInit(): void {
  }

}
