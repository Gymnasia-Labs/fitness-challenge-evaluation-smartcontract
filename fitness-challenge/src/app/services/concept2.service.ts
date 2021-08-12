import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Concept2Service {

  constructor(private http: HttpClient) { 
  }

  getUserData(id:string){
    return this.http.get<any>(
      environment.CONCEPT2_API +
       '/api/users/' + id
       )
  }

  getResultsData(id:string){
    return this.http.get<any>(
      environment.CONCEPT2_API +
       `/api/users/${id}/results`
       )
  }

  getStrokesData(id:string, resultId: string){
    return this.http.get<any>(
      environment.CONCEPT2_API +
       `/api/users/${id}/results/${resultId}/strokes`
       )
  }



}
