import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setConcept2Name } from '../ngrx/app.actions';
import { selectConcept2Name } from '../ngrx/app.reducer';
import { AuthService } from '../services/auth.service';
import { Concept2Service } from '../services/concept2.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  concept2Name$ = this.store.pipe(
    select(selectConcept2Name)
  );

  constructor(
    private authService: AuthService,
    public store: Store
    ) { }

  ngOnInit(): void {
  }

  getLoginURL(brand:string){
    return this.authService.getLoginLink(brand);
  }

  logout(brand:string){
    this.authService.logout();
    if(brand==='concept2'){
      this.store.dispatch(setConcept2Name({name: ''}))
    }
  }

}
