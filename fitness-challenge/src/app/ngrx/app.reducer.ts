import { createSelector, createFeatureSelector, createReducer, on } from "@ngrx/store";
import { Challenge } from "../models/challenge";

export interface AppState {
  challenges: Challenge[]
};

export const initialState: AppState =
{
  challenges: [
    {
      id: 0,
      title: '1500m Rowing Challenge',
      description: 'The fastest 1500m row will win a cyberpunk',
      image: 'https://www.larvalabs.com/public/images/cryptopunks/punk3100.png',
      rules: [
        'Results will be submitted by the concept2 rower via their api',
        'Begins (4.12.21) Ends (4.20.21). All logs must be submitted by 12pm EST on (4.20.21)',
        'ETH is required to participate'
      ],
      creator: '0xEF571ac215b9eC5Ef22a12954fF0d87d90e1F10B',
      creationTime: new Date()
    },
    {
      id: 1,
      title: '2000m Rowing Challenge',
      description: 'The fastest 2000m row will win a cyberpunk',
      image: 'https://www.larvalabs.com/public/images/cryptopunks/punk3100.png',
      rules: [
        'Results will be submitted by the concept2 rower via their api',
        'Begins (4.12.21) Ends (4.20.21). All logs must be submitted by 12pm EST on (4.20.21)',
        'ETH is required to participate'
      ],
      creator: '0xEF571ac215b9eC5Ef22a12954fF0d87d90e1F10B',
      creationTime: new Date()
    },
    {
      id: 2,
      title: '2500m Rowing Challenge',
      description: 'The fastest 2500m row will win a cyberpunk',
      image: 'https://www.larvalabs.com/public/images/cryptopunks/punk3100.png',
      rules: [
        'Results will be submitted by the concept2 rower via their api',
        'Begins (4.12.21) Ends (4.20.21). All logs must be submitted by 12pm EST on (4.20.21)',
        'ETH is required to participate'
      ],
      creator: '0xEF571ac215b9eC5Ef22a12954fF0d87d90e1F10B',
      creationTime: new Date()
    },
    {
      id: 3,
      title: '5000m Rowing Challenge',
      description: 'The fastest 5000m row will win a cyberpunk',
      image: 'https://www.larvalabs.com/public/images/cryptopunks/punk3100.png',
      rules: [
        'Results will be submitted by the concept2 rower via their api',
        'Begins (4.12.21) Ends (4.20.21). All logs must be submitted by 12pm EST on (4.20.21)',
        'ETH is required to participate'
      ],
      creator: '0xEF571ac215b9eC5Ef22a12954fF0d87d90e1F10B',
      creationTime: new Date()
    }
  ]
}
  ;

export const appReducer = createReducer(
  initialState,
  // on(setRestaurants, (state, { restaurants }) =>({ ...state, restaurants: [...restaurants], restaurantsLoading: false })) ,
  

);



export const selectChallenges = createSelector<any, any, any>(
  (reducer: any) => reducer.data,
  (state: AppState) => state.challenges
);

export const selectChallengeById = (id:number) => createSelector<any, any, any>(
  (reducer: any) => reducer.data,
  (state: AppState) => state.challenges.find(challenge => challenge.id === id)
);
