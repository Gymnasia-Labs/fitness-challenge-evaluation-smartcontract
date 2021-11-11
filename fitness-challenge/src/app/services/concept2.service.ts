import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class Concept2Service {

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  getUserData(id: string) {

    const accessToken = this.tokenService.getToken();



    return this.http.get<any>(
      `${environment.GYMNASIA_API}/data/users` +
      `/${environment.CONCEPT2_API.replace('https://', '')}` +
      `/${accessToken}` +
      `/${id}`
    );

  }

  getResultsData(id: string) {
    const accessToken = this.tokenService.getToken();

    return this.http.get<any>(
      `${environment.GYMNASIA_API}/data/users` +
      `/${environment.CONCEPT2_API.replace('https://', '')}` +
      `/${accessToken}` +
      `/${id}` +
      `/results`
    );

  }

  getStrokesData(id: string, resultId: string) {
    return this.http.get<any>(
      environment.CONCEPT2_API +
      `/api/users/${id}/results/${resultId}/strokes`
    )
  }



}
