import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeComponent } from './challenge/challenge.component';
import { ChallengesComponent } from './challenges/challenges.component';

const routes: Routes = [
  { path: '', component: ChallengesComponent },
  { path: 'challenge/:id', component: ChallengeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
