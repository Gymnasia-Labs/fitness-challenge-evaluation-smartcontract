import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { ChallengesComponent } from './challenges/challenges.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './ngrx/app.reducer';
import {MatCardModule} from '@angular/material/card';
import { ChallengeDetailComponent } from './challenge-detail/challenge-detail.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ChallengeComponent } from './challenge/challenge.component';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
import { AboutComponent } from './about/about.component';
import { AuthInterceptor } from './auth.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    ChallengesComponent,
    ChallengeDetailComponent,
    ChallengeComponent,
    AboutComponent
  ],
  imports: [
    StoreModule.forRoot({ data: appReducer }),
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule
  ],
  providers: [
    // {provide: LocationStrategy, useClass: HashLocationStrategy},

    
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
