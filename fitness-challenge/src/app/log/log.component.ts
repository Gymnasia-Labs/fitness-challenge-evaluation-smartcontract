import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TrainingData } from '../models/training.data';
import { fetchConcept2Data, setConcept2DataLoading } from '../ngrx/app.actions';
import { selectConcept2DataLoading, selectTrainingData } from '../ngrx/app.reducer';
import { Concept2Service } from '../services/concept2.service';


// export interface excerciseLog {
//   id:number
//   date: string,
//   brand: string,
//   type: string,
//   distance: string,
//   time: string,
//   pace: number,
//   hearthRate: number
// }

// const ELEMENT_DATA: excerciseLog[] = [
//   {
//     date: 'string',
//     brand: 'string',
//     type: 'string',
//     distance: 1000,
//     time: 'string',
//     pace: 4,
//     hearthRate: 75
//   }
// ];

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  logData$ = this.store.pipe(
    select(selectTrainingData)
  );

  concept2Loading$ = this.store.pipe(
    select(selectConcept2DataLoading)
  );

  clickedRow: TrainingData | undefined;

  constructor(
    private concept2Service: Concept2Service,
    private store: Store
  ) {
  }

  displayedColumns: string[] = [
    'date',
    // 'brand', 
    'type',
    'distance',
    'time',
    // 'pace', 
    // 'hearthRate'
  ];

  ngOnInit(): void {

    // this.logData$.subscribe(
    //   data => console.log('commulatedData: ', data)
    // )

  }

  refresh() {
    this.store.dispatch(setConcept2DataLoading({ isLoading: true }));
    this.store.dispatch({ type: fetchConcept2Data });

  }

  getDate(date: string) {

    return new Date(date.replace(/-/g, "/"));
  }

  getFormatedTime(time: number) {
    let mins = Math.floor(time / 600);
    let secs = Math.floor((time % 600) / 10);
    let deciSecs = (time % 6);
    if (secs < 10)
      return `${mins}:0${secs}:${deciSecs}`
    else
      return `${mins}:${secs}:${deciSecs}`
  }


}
