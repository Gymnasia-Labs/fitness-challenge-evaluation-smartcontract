import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectChallengeById } from '../ngrx/app.reducer';

export interface PeriodicElement {
  distance: string,
  time: string,
  account: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {distance: '1500m', time: '3:21 secs', account: '0xEF571ac215b9eC5Ef22a12954fF0d87d90e1F10B', },
  {distance: '1500m', time: '3:34 secs', account: '0x4d28204Dbb0b357f49e5f688427e3d59d8e78bfA', },
  {distance: '1500m', time: '3:57 secs', account: '0x246070cd283Ff6B83a55e481bC23F7f1A1fEDCeA', },
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

  constructor(private actRoute: ActivatedRoute, private store: Store) {
    let id = +this.actRoute.snapshot.params.id;
    this.challenge$ = this.store.pipe(
      select(selectChallengeById(id))
      );
   }

  ngOnInit(): void {
  }

}
