import { createAction, props } from '@ngrx/store';
import { Challenge } from '../models/challenge';
import { Concept2Data } from '../models/concept2';
import { TrainingData } from '../models/training.data';
import { AppState } from './app.reducer';

// export const setRestaurants = createAction(
//     '[Restaurant] set restaurants',
//     props<{ restaurants: Restaurant[] }>()
// );

//setActions that write in the store

export const setChallenges = createAction(
    '[Address] set challenges',
    props<{ challenges: Challenge[] }>()
);

export const setAddress = createAction(
    '[Address] set address',
    props<{ address: string }>()
);

export const setConcept2Name = createAction(
    '[Concept2] set name',
    props<{ name: string }>()
);

export const setConcept2Data = createAction(
    '[Concept2] set Data',
    props<{ data: Concept2Data[] }>()
);

export const setTrainingData = createAction(
    '[Training] set Data',
    props<{ data: TrainingData[] }>()
);

export const setConcept2DataLoading = createAction(
    '[Concept2] set Data loading',
    props<{ isLoading: boolean }>()
);

//fetchActions that trigger effects

export const fetchConcept2Data = '[Concept2] fetch data';
export const fetchConcept2User = '[Concept2] fetch user';
export const fetchChallenges = '[Contract] fetch challenges';

