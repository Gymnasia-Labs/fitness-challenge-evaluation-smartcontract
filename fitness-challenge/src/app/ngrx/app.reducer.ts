import { createSelector, createFeatureSelector, createReducer, on } from "@ngrx/store";
import { Challenge } from "../models/challenge";
import { Concept2 } from "../models/concept2";
import { setAddress, setConcept2Name } from "./app.actions";

export interface AppState {
  challenges: Challenge[],
  address: string,
  concept2: Concept2
};

export const initialState: AppState =
{
  challenges: [
    {
      id: 0,
      title: '2000m Rowing Challenge',
      description: 'The rower who can row the fastest distance within 1 minute will win 1 Bitcoin',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1024px-Bitcoin.svg.png',
      rules: [
        /* bitcoin-2136339_960_720 1 */
        'Must use a concept2 pm5 rower',
        `All logs must be submitted by ${new Date( new Date().valueOf() + 100 * 60 * 60 * 24).getHours()}pm EST on (${new Date( new Date().valueOf() + 100 * 60 * 60 * 24).toDateString()})`,
        '.0005btc is required to submit your results'
      ],
      creator: 'Account #135',
      creationTime: new Date(),
      start: new Date(),
      end: new Date( new Date().valueOf() + 100 * 60 * 60 * 24),
      participants: 0
    },
    {
      id: 1,
      title: '4000m Rowing Challenge',
      description: 'The rower who can row the fastest distance within 2 minutes will win 1 Bitcoin',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1024px-Bitcoin.svg.png',
      rules: [
        'Must use a concept2 pm5 rower',
        `All logs must be submitted by ${new Date( new Date().valueOf() + 300 * 60 * 60 * 24).getHours()}pm EST on (${new Date( new Date().valueOf() + 300 * 60 * 60 * 24).toDateString()})`,
        '.0005btc is required to submit your results'
      ],
      creator: 'Account #135',
      creationTime: new Date(),
      start: new Date(new Date().valueOf() + 100 * 60 * 60 * 24),
      end: new Date( new Date().valueOf() + 300 * 60 * 60 * 24),
      participants: 10
    },
    // {
    //   id: 2,
    //   title: '2500m Rowing Challenge',
    //   description: 'The fastest 2500m row will win a cyberpunk',
    //   image: 'https://www.larvalabs.com/public/images/cryptopunks/punk3100.png',
    //   rules: [
    //     'Results will be submitted by the concept2 rower via their api',
    //     'Begins (4.12.21) Ends (4.20.21). All logs must be submitted by 12pm EST on (4.20.21)',
    //     'ETH is required to participate'
    //   ],
    //   creator: '0xEF571ac215b9eC5Ef22a12954fF0d87d90e1F10B',
    //   creationTime: new Date(),
    //   start: new Date(new Date().valueOf() + 2 * 100 * 60 * 60 * 24),
    //   end: new Date( new Date().valueOf() + 4 *  100 * 60 * 60 * 24),
    //   participants: 20
    // },
    // {
    //   id: 3,
    //   title: '5000m Rowing Challenge',
    //   description: 'The fastest 5000m row will win a cyberpunk',
    //   image: 'https://www.larvalabs.com/public/images/cryptopunks/punk3100.png',
    //   rules: [
    //     'Results will be submitted by the concept2 rower via their api',
    //     'Begins (4.12.21) Ends (4.20.21). All logs must be submitted by 12pm EST on (4.20.21)',
    //     'ETH is required to participate'
    //   ],
    //   creator: '0xEF571ac215b9eC5Ef22a12954fF0d87d90e1F10B',
    //   creationTime: new Date(),
    //   start: new Date(new Date().valueOf() + 4 * 100 * 60 * 60 * 24),
    //   end: new Date( new Date().valueOf() + 8 *  100 * 60 * 60 * 24),
    //   participants: 5000
    // }
  ],
  address: '',
  concept2: {
    name: ''
  }
}
  ;

export const appReducer = createReducer(
  initialState,
  // on(setRestaurants, (state, { restaurants }) =>({ ...state, restaurants: [...restaurants], restaurantsLoading: false })) ,
  on(setAddress, (state, { address }) =>  ({ ...state, address: address })),
  on(setConcept2Name, (state, { name }) =>  ({ ...state, concept2: {...state.concept2, name: name,} })),
  
);



export const selectChallenges = createSelector<any, any, any>(
  (reducer: any) => reducer.data,
  (state: AppState) => state.challenges
);

export const selectChallengeById = (id:number) => createSelector<any, any, any>(
  (reducer: any) => reducer.data,
  (state: AppState) => state.challenges.find(challenge => challenge.id === id)
);

export const selectAddress = createSelector<any, any, any>(
  (reducer: any) => reducer.data,
  (state: AppState) => state.address
);

export const selectConcept2Name = createSelector<any, any, any>(
  (reducer: any) => reducer.data,
  (state: AppState) => state.concept2.name
);
