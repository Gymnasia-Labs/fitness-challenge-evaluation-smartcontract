import { BigNumber } from "@ethersproject/bignumber";
import { createSelector, createFeatureSelector, createReducer, on } from "@ngrx/store";
import { ethers } from "ethers";
import { Challenge, LeaderBoard} from "../models/challenge";
import { Concept2 } from "../models/concept2";
import { TrainingData } from "../models/training.data";
import {
  fetchConcept2Data,
  setAddress, setChallenges, setConcept2Data, setConcept2DataLoading, setConcept2Name, setDisplayedChallenge, setTrainingData
} from "./app.actions";

export interface AppState {
  challenges: Challenge[],
  address: string,
  concept2: Concept2,
  trainingData: TrainingData[], // the commulated training data of all brands
  displayedChallenge: number
};

export const initialState: AppState =
{
  challenges: [
    // {
    //   id: 0,
    //   title: '2000m Rowing Challenge',
    //   description: 'The rower who can row the fastest distance within 1 minute will win 1 Bitcoin',
    //   image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1024px-Bitcoin.svg.png',
    //   rules: [
    //     /* bitcoin-2136339_960_720 1 */
    //     'Must use a concept2 pm5 rower',
    //     `All logs must be submitted by ${new Date(new Date().valueOf() + 100 * 60 * 60 * 24).getHours()}pm EST on (${new Date(new Date().valueOf() + 100 * 60 * 60 * 24).toDateString()})`,
    //     '.0005btc is required to submit your results'
    //   ],
    //   creator: 'Account #135',
    //   creationTime: new Date(),
    //   start: new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 ),
    //   end: new Date(new Date().valueOf() + 100 * 60 * 60 * 24),
    //   participants: 0,
    //   price: 1,
    //   leaderBoard: []
    // },
    // {
    //   id: 1,
    //   title: '4000m Rowing Challenge',
    //   description: 'The rower who can row the fastest distance within 2 minutes will win 1 Bitcoin',
    //   image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1024px-Bitcoin.svg.png',
    //   rules: [
    //     'Must use a concept2 pm5 rower',
    //     `All logs must be submitted by ${new Date(new Date().valueOf() + 300 * 60 * 60 * 24).getHours()}pm EST on (${new Date(new Date().valueOf() + 300 * 60 * 60 * 24).toDateString()})`,
    //     '.0005btc is required to submit your results'
    //   ],
    //   creator: 'Account #135',
    //   creationTime: new Date(),
    //   start: new Date(new Date().valueOf() + 100 * 60 * 60 * 24),
    //   end: new Date(new Date().valueOf() + 300 * 60 * 60 * 24),
    //   participants: 10,
    //   price: 2,
    //   leaderBoard: []
    // },
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
    name: '',
    data: [],
    loading: false
  },
  trainingData: [],
  displayedChallenge: -1
}
  ;

export const appReducer = createReducer(
  initialState,
  // on(setRestaurants, (state, { restaurants }) =>({ ...state, restaurants: [...restaurants], restaurantsLoading: false })) ,
  on(setChallenges, (state, { challenges }) => {console.log('setting challenges...'); return  ({ ...state, challenges: challenges.map(toChallenge) })}),
  on(setAddress, (state, { address }) => ({ ...state, address: address })),
  on(setConcept2Name, (state, { name }) => ({ ...state, concept2: { ...state.concept2, name: name, } })),
  on(setConcept2Data, (state, { data }) => ({ ...state, concept2: { ...state.concept2, data: data, loading: false } })),
  on(setTrainingData, (state, { data }) => ({ ...state, trainingData: data })),
  on(setConcept2DataLoading, (state, { isLoading }) => ({ ...state, concept2: { ...state.concept2, loading: isLoading, } })),
  on(setDisplayedChallenge, (state, { id }) => ({ ...state, displayedChallenge: id})),

  );

const toChallenge = (challenge: Challenge) => {
  
  // challenge.start = new Date( +challenge.start * 1000);
  // challenge.end = new Date( +challenge.end * 1000);
  return {...challenge, 
    id: +challenge.id.toString(),
    start: new Date( +challenge.start * 1000), 
    end : new Date( +challenge.end * 1000),
    price: challenge.price.toString(),
    leaderBoard: [...challenge.leaderBoard].sort( (a:LeaderBoard, b:LeaderBoard)=> a.time - b.time)
  };
}

export const selectChallenges = createSelector<any, any, any>(
  (reducer: any) => reducer.data,
  (state: AppState) => state.challenges
);

export const selectDisplayedChallenge = createSelector<any, any, any>(
  (reducer: any) => reducer.data,
  (state: AppState) => state.challenges.find(challenge => challenge.id === state.displayedChallenge)
);

export const selectChallengeById = (id: number) => createSelector<any, any, any>(
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

export const selectConcept2Data = createSelector<any, any, any>(
  (reducer: any) => reducer.data,
  (state: AppState) => state.concept2.data
);

export const selectConcept2DataLoading = createSelector<any, any, any>(
  (reducer: any) => reducer.data,
  (state: AppState) => state.concept2.loading
);

export const selectTrainingData = createSelector<any, any, any>(
  (reducer: any) => reducer.data,
  (state: AppState) => state.concept2.data.map(result => (
    {
      id: result.id,
      date: result.date,
      brand: 'concept2',
      type: result.type,
      distance: result.distance + 'm',
      timeFormated: result.time_formatted,
      time: result.time,
      pace: 0,
      hearthRate: 0
    }
  ))
);

export const selectTrainingsForDisplayedChallenge  = createSelector<any, any, any>(
  (reducer: any) => reducer.data,
  (state: AppState,) => {
    let challenge = state.challenges.find(challenge => challenge.id === state.displayedChallenge);
    console.log('i got called');
    console.log(state.concept2.data);
    
    return state.concept2.data.
      filter(data => {
        // return new Date(data.date) >= (challenge as Challenge).start
        //   && new Date(data.date) <= (challenge as Challenge).end
        return true;
      })
      .map(result => (
        {
          id: result.id,
          date: result.date,
          brand: 'concept2',
          type: result.type,
          distance: result.distance + 'm',
          timeFormated: result.time_formatted,
          time: result.time,
          pace: 0,
          hearthRate: 0
        }
      ))
  });