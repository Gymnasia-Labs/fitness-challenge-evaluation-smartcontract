import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { ChallengesComponent } from './challenges/challenges.component';
import { HomeComponent } from './home/home.component';
import { LogComponent } from './log/log.component';
import { MembershipsComponent } from './memberships/memberships.component';
import { SettingsComponent } from './settings/settings.component';
import { TrainingComponent } from './training/training.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'challenges', component: ChallengesComponent },
  { path: 'challenge/:id', component: ChallengeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'log', component: LogComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'memberships', component: MembershipsComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'admin', component: AdminComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
