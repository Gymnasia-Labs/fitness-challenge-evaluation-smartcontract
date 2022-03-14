import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ChallengesComponent } from './challenges/challenges.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './ngrx/app.reducer';
import { MatCardModule } from '@angular/material/card';
import { ChallengeDetailComponent } from './challenge-detail/challenge-detail.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ChallengeComponent } from './challenge/challenge.component';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { AboutComponent } from './about/about.component';
import { AuthInterceptor } from './auth.interceptor';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LogComponent } from './log/log.component';
import { TrainingComponent } from './training/training.component';
import { SettingsComponent } from './settings/settings.component';
import { MembershipsComponent } from './memberships/memberships.component';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './ngrx/app.effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MatSelectModule } from '@angular/material/select';
import { NgParticlesModule } from "ng-particles";
import { MatDialogModule } from '@angular/material/dialog';
import { WinnerDialogComponent } from './winner-dialog/winner-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TransactionLoadingDialogComponent } from './transaction-loading-dialog/transaction-loading-dialog.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    AppComponent,
    ChallengesComponent,
    ChallengeDetailComponent,
    ChallengeComponent,
    AboutComponent,
    LogComponent,
    TrainingComponent,
    SettingsComponent,
    MembershipsComponent,
    AdminComponent,
    HomeComponent,
    LeaderboardComponent,
    WinnerDialogComponent,
    TransactionLoadingDialogComponent
  ],
  imports: [
    StoreModule.forRoot({ data: appReducer }),
    EffectsModule.forRoot([AppEffects]),
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSelectModule,
    NgParticlesModule,
    MatDialogModule,
    MatTooltipModule,
    MatTabsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
