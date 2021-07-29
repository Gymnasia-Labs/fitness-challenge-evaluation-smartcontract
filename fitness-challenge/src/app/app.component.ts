import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectAddress } from './ngrx/app.reducer';
import { AuthService } from './services/auth.service';
import { ContractService } from './services/contract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myAddress$ = this.store.pipe(select(selectAddress));

constructor(private readonly route: ActivatedRoute,
            private authService: AuthService,
            public contractService: ContractService,
            private store: Store){
  route.queryParams.subscribe( (params) => {
    console.log('params: ', params);
    if(params.code)
    this.login(params.code)
  });
}

login(code:string){
  this.authService.login(code).subscribe(
    res => console.log('res', res)
  )
}

}
