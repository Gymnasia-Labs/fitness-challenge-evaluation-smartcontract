import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { catchError, tap } from 'rxjs/operators';


const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    // host : 'log.concept2.com',
    'Content-Type': 'application/x-www-form-urlencoded',
    // Authorization: 'Bearer TA3n1vrNjuQJWw0TdCDHnjSmrjIPULhTlejMIWqq',
    // response_type: 'code'
    // responseType : 'text'
    Accept: 'application/vnd.c2logbook.v1+json'
  }),
  // responseType: 'text' as 'json'
};

// const scope = 'user:read';
const scope = 'user:read,results:read';
const response_type = 'code';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  private static log(message: string): any {
    console.log(message);
  }  

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  login(code:string): Observable<any> {
    console.log(code);
    
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('client_id', environment.client_id)
      // .set('client_secret',       environment.client_secret)
      .set('grant_type', 'authorization_code')
      .set('redirect_uri',       'http://localhost:4200')
      .set('code',       code)
      .set('scope', scope);

        return this.http.post<any>(
      environment.GYMNASIA_API + '/oauth/access_token'
      ,    
      body,
      HTTP_OPTIONS
       )


      .pipe(
        tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(AuthService.handleError)
      );
  }

  refreshToken(refreshData: any): Observable<any> {
    // this.tokenService.removeToken();
    // this.tokenService.removeRefreshToken();

      const body = new HttpParams()
      .set('client_id', environment.client_id)
      .set('client_secret',       environment.client_secret)
      .set('grant_type', 'refresh_token')
      .set('redirect_uri',       'http://localhost:4200')
      .set('refresh_token', refreshData.refresh_token)
      .set('scope', scope);

    return this.http.post<any>(environment.CONCEPT2_API + '/oauth/access_token', body, HTTP_OPTIONS).pipe(
        tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(AuthService.handleError)
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(environment.CONCEPT2_API + 'oauth/signup', data)
      .pipe(
        tap(_ => AuthService.log('register')),
        catchError(AuthService.handleError)
      );
  }

  secured(): Observable<any> {
    return this.http.get<any>(environment.CONCEPT2_API + 'secret')
      .pipe(catchError(AuthService.handleError));
  }

  getLoginLink(brand: string) {
    if(brand === 'concept2'){
    return `${environment.CONCEPT2_API}/oauth/authorize?client_id=${environment.client_id}&scope=${scope}&response_type=code&redirect_uri=${environment.redirect_uri}`;
  }
  return '';
  }

}
