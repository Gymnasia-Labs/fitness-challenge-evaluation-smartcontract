import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Concept2Service } from '../services/concept2.service';

import { fetchConcept2Data, fetchConcept2User, setConcept2Data, setConcept2Name } from './app.actions';

@Injectable()
export class AppEffects {

    // fetchConcept2Lo$ = createEffect(() => this.actions$.pipe(
    //     ofType(fetchConcept2Data),
    //     mergeMap(() => from(this.concept2Service.getResultsData('me'))
    //         .pipe(
    //             tap(res => console.log(res)),
    //             map(result => setConcept2Data({ data: result })),
    //             catchError(() => EMPTY)
    //         ))
    // )
    // );

    fetchConcept2Log$ = createEffect(() => this.actions$.pipe(
        ofType(fetchConcept2Data),
        switchMap((action: any) =>
        this.concept2Service.getResultsData('me')
                .pipe(
                    tap(console.log),
                    map((data) => setConcept2Data({ data: data.data })),
                    catchError(() => EMPTY)
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


    // createRestaurant$ = createEffect(() => this.actions$.pipe(
    //     ofType(createRestaurantType),
    //     switchMap((action: any) =>
    //         from(this.contractService.createRestaurant(action.payload.name, action.payload.time))
    //             .pipe(
    //                 // tap(console.log),
    //                 map(() => setRestaurantsLoading({ isLoading: true })),
    //                 catchError(() => EMPTY)
    //             ))
    // )
    // );

    
    constructor(
        private actions$: Actions,
        // private contractService: ContractService,
        private concept2Service: Concept2Service,
        private store$: Store<any>
    ) { }
}