import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs/operators';
import { CHALLENGE_ID } from './challenge/challenge.component';
import { fetchChallenges, fetchConcept2Data, fetchConcept2User, setConcept2DataLoading, setConcept2Name } from './ngrx/app.actions';
import { selectAddress } from './ngrx/app.reducer';
import { AuthService } from './services/auth.service';
import { Concept2Service } from './services/concept2.service';
import { ContractService } from './services/contract.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  myAddress$ = this.store.pipe(select(selectAddress));
  sideNavOpened = true;

  constructor(private readonly route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public contractService: ContractService,
    private store: Store,
    private concept2Service: Concept2Service,
    private tokenService: TokenService) {
    route.queryParams.subscribe((params) => {
      console.log('params: ', params);
      if (params.code)
        this.login(params.code)
    });
  }

  ngOnInit() {
    this.store.dispatch({ type: fetchChallenges });
    if (this.tokenService.getToken()) {
      this.store.dispatch(setConcept2DataLoading({ isLoading: true }))
      this.store.dispatch({ type: fetchConcept2Data });
      this.store.dispatch({ type: fetchConcept2User });
      // this.concept2Service
      //         .getUserData('me')
      //         .subscribe(
      //           data =>  this.store.dispatch(setConcept2Name({name: data.data.username})))
    }

  }

  login(code: string) {
    this.authService
      .login(code)
      .pipe(
        tap(console.log),
        switchMap(() => this.concept2Service.getUserData('me')),
        tap(data => this.store.dispatch(setConcept2Name({ name: data.data.username })))
      )
      .subscribe(
        () => {
          let prevChallengeId = localStorage.getItem(CHALLENGE_ID);
          if (prevChallengeId) {
            localStorage.removeItem(CHALLENGE_ID);
            this.router.navigate(['challenge/' + prevChallengeId]);
          }
          else {
            this.router.navigate(['settings']);
          }
        }
      )
  }

}
