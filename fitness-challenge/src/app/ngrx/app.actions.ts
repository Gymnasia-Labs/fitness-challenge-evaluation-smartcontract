import { createAction, props } from '@ngrx/store';
import { AppState } from './app.reducer';

// export const setRestaurants = createAction(
//     '[Restaurant] set restaurants',
//     props<{ restaurants: Restaurant[] }>()
// );

export const setAddress = createAction(
    '[Address] set address',
    props<{ address: string }>()
);
