import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import {

} from './app.actions';

@Injectable()
export class AppEffects {

    // fetchRestaurants$ = createEffect(() => this.actions$.pipe(
    //     ofType(fetchRestaurantsType),
    //     mergeMap(() => from(this.contractService.getAllRestaurents())
    //         .pipe(
    //             // tap(res => console.log(res)),
    //             map(restaurants => setRestaurants({ restaurants: restaurants })),
    //             catchError(() => EMPTY)
    //         ))
    // )
    // );

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
        private store$: Store<any>
    ) { }
}