import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, forkJoin, from, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Challenge, Ruleset } from '../models/challenge';
import { Concept2Service } from '../services/concept2.service';
import { ContractService, trainingTypes } from '../services/contract.service';

import { fetchChallenges, fetchConcept2Data, fetchConcept2User, setChallenges, setConcept2Data, setConcept2DataLoading, setConcept2Name } from './app.actions';

@Injectable()
export class AppEffects {

    fetchConcept2Log$ = createEffect(() => this.actions$.pipe(
        ofType(fetchConcept2Data),
        switchMap((action: any) =>
            this.concept2Service.getResultsData('me')
                .pipe(
                    tap(console.log),
                    map((data) => setConcept2Data({ data: data.data.map((workout: any) => ({ ...workout, date: workout.date_utc })) })),
                    catchError(() =>
                        of(setConcept2DataLoading({ isLoading: false }))
                    )
                ))
    )
    );

    fetchConcept2User$ = createEffect(() => this.actions$.pipe(
        ofType(fetchConcept2User),
        switchMap((action: any) =>
            this.concept2Service.getUserData('me')
                .pipe(
                    tap(console.log),
                    map((data) => setConcept2Name({ name: data.data.username })),
                    catchError(() => EMPTY)
                ))
    )
    );

    fetchChallenges$ = createEffect(() => this.actions$.pipe(
        ofType(fetchChallenges),
        switchMap((action: any) =>
            from(this.contractService.getChallenges())
                .pipe(
                    tap(v => console.log('challenges: ', v)),
                    mergeMap((challenges: Challenge[]) => {
                        const obs = challenges.map(c => this.contractService.getChallengeRuleset(c.id));
                        return forkJoin(
                            [
                                ...obs,
                                of(challenges),

                            ]
                        );
                    }),
                    map((data: any) => {
                        let challenges = data.pop();
                        data = data.map((ruleset: Ruleset) => {
                            let trainingType = [...trainingTypes.entries()]
                                .filter(({ 1: v }) => v === +ruleset.types[0])
                                .map(([k]) => k)[0];
                            return { ...ruleset, types: [trainingType] }
                        })

                        challenges = challenges.map((challenge: Challenge, i: number) => ({ ...challenge, ruleset: data[i] }))
                        return setChallenges({ challenges: challenges.reverse() })
                    }),
                    catchError(() => EMPTY)
                ))
    )
    );



    constructor(
        private actions$: Actions,
        private contractService: ContractService,
        private concept2Service: Concept2Service,
        private store$: Store<any>
    ) { }
}