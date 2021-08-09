import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { ChallengesComponent } from './challenges/challenges.component';
import { LogComponent } from './log/log.component';
import { MembershipsComponent } from './memberships/memberships.component';
import { SettingsComponent } from './settings/settings.component';
import { TrainingComponent } from './training/training.component';

const routes: Routes = [
  { path: 'challenges', component: ChallengesComponent },
  { path: 'challenge/:id', component: ChallengeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'log', component: LogComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'memberships', component: MembershipsComponent },
  { path: 'training', component: TrainingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
