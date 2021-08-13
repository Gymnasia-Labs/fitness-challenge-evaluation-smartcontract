import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Concept2Service } from '../services/concept2.service';


export interface excerciseLog {
  id:number
  date: string,
  brand: string,
  type: string,
  distance: string,
  time: string,
  pace: number,
  hearthRate: number
}

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

  constructor(private concept2Service: Concept2Service) {
    this.logData = this.concept2Service.getResultsData('me').pipe(
      map(results => results.data),
      tap(console.log),
      map(
        (results: any[]) => {
          return  results.map(result =>(
            {
              id: result.id,
              date: result.date,
              brand: 'concept2',
              type: result.type,
              distance: result.distance + 'm',
              time: result.time_formatted,
              pace: 0,
              hearthRate: 0
            }
          ))
        }
      )
    )
  }

  displayedColumns: string[] = [
    'date', 
    'brand', 
    'type', 
    'distance', 
    'time', 
    // 'pace', 
    // 'hearthRate'
  ];
  logData: Observable<excerciseLog[]>;

  ngOnInit(): void {



  }


}
