import { BigNumber } from "@ethersproject/bignumber";
import { createSelector, createFeatureSelector, createReducer, on } from "@ngrx/store";
import { ethers } from "ethers";
import { Challenge, LeaderBoard } from "../models/challenge";
import { Concept2 } from "../models/concept2";
import { TrainingData } from "../models/training.data";
import { trainingTypes } from "../services/contract.service";
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
    //   id: 1,
    //   title: '2000m rowing challenge',
    //   description: 'this is a 200m rowing challenge. The athlete who completes the following workout with the best time will win',
    //   image: '',
    //   rules: ['300'],
    //   creator: '0x42B0a49C356A461F501019914f251D9B3e654a54',
    //   creationTime: new Date(),
    //   start: new Date('11.09.2021 10:00'),
    //   end: new Date('11.09.2021 20:00'),
    //   participants: 5,
    //   price: '10000000000',
    //   leaderBoard: [{
    //     challenger: 'me',
    //     data: 300,
    //     time: 60
    //   }],
    //   fee: '100000000000000000',
    //   currentParticipantsCount: 1,
    //   maxParticipantsCount: 5,
    //   redeemed: false,
    //   ruleset: {
    //     condition: [500],
    //     types: ['rower']
    //   }
    // },
    // {
    //   id: 2,
    //   title: 'past challenge',
    //   description: 'past challenge',
    //   image: '',
    //   rules: ['300'],
    //   creator: '0x42B0a49C356A461F501019914f251D9B3e654a54',
    //   creationTime: new Date(),
    //   start: new Date('10.09.2021 10:00'),
    //   end: new Date('10.09.2021 20:00'),
    //   participants: 5,
    //   price: '10000000000',
    //   leaderBoard: [{
    //     challenger: 'me',
    //     data: 300,
    //     time: 60
    //   }],
    //   fee: '100000000000000000',
    //   currentParticipantsCount: 1,
    //   maxParticipantsCount: 5,
    //   redeemed: false,
    //   ruleset: {
    //     condition: [500],
    //     types: ['rower']
    //   }
    // },
    // {
    //   id: 3,
    //   title: 'upcomming',
    //   description: 'upcomming',
    //   image: '',
    //   rules: ['300'],
    //   creator: '0x42B0a49C356A461F501019914f251D9B3e654a54',
    //   creationTime: new Date(),
    //   start: new Date('12.09.2021 10:00'),
    //   end: new Date('12.09.2021 20:00'),
    //   participants: 5,
    //   price: '10000000000',
    //   leaderBoard: [{
    //     challenger: 'me',
    //     data: 300,
    //     time: 60
    //   }],
    //   fee: '100000000000000000',
    //   currentParticipantsCount: 1,
    //   maxParticipantsCount: 5,
    //   redeemed: false,
    //   ruleset: {
    //     condition: [500],
    //     types: ['rower']
    //   }
    // },
    // {
    //   id: 3,
    //   title: '2000m rowing challenge',
    //   description: 'this is a 200m rowing challenge. The athlete who completes the following workout with the best time will win',
    //   image: '',
    //   rules: ['300'],
    //   creator: '0x42B0a49C356A461F501019914f251D9B3e654a54',
    //   creationTime: new Date(),
    //   start: new Date('11.09.2021 10:00'),
    //   end: new Date('11.09.2021 20:00'),
    //   participants: 5,
    //   price: '10000000000',
    //   leaderBoard: [{
    //     challenger: 'me',
    //     data: 300,
    //     time: 60
    //   }],
    //   fee: '100000000000000000',
    //   currentParticipantsCount: 1,
    //   maxParticipantsCount: 5,
    //   redeemed: false,
    //   ruleset: {
    //     condition: [500],
    //     types: ['rower']
    //   }
    // },
    // {
    //   id: 4,
    //   title: '2000m rowing challenge',
    //   description: 'this is a 200m rowing challenge. The athlete who completes the following workout with the best time will win',
    //   image: '',
    //   rules: ['300'],
    //   creator: '0x42B0a49C356A461F501019914f251D9B3e654a54',
    //   creationTime: new Date(),
    //   start: new Date('11.09.2021 10:00'),
    //   end: new Date('11.09.2021 20:00'),
    //   participants: 5,
    //   price: '10000000000',
    //   leaderBoard: [{
    //     challenger: 'me',
    //     data: 300,
    //     time: 60
    //   }],
    //   fee: '100000000000000000',
    //   currentParticipantsCount: 1,
    //   maxParticipantsCount: 5,
    //   redeemed: false,
    //   ruleset: {
    //     condition: [500],
    //     types: ['rower']
    //   }
    // },

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
  on(setChallenges, (state, { challenges }) => ({ ...state, challenges: challenges.map(toChallenge) })),
  on(setAddress, (state, { address }) => ({ ...state, address: address })),
  on(setConcept2Name, (state, { name }) => ({ ...state, concept2: { ...state.concept2, name: name, } })),
  on(setConcept2Data, (state, { data }) => ({ ...state, concept2: { ...state.concept2, data: data.map(workout => ({ ...workout, date: workout.date_utc + '.000Z' })), loading: false } })),
  on(setTrainingData, (state, { data }) => ({ ...state, trainingData: data })),

  on(setConcept2DataLoading, (state, { isLoading }) => ({ ...state, concept2: { ...state.concept2, loading: isLoading, } })),
  on(setDisplayedChallenge, (state, { id }) => ({ ...state, displayedChallenge: id })),

);

const toChallenge = (challenge: Challenge) => {

  // challenge.start = new Date( +challenge.start * 1000);
  // challenge.end = new Date( +challenge.end * 1000);
  return {
    ...challenge,
    id: +challenge.id.toString(),
    start: new Date(+challenge.start * 1000),
    end: new Date(+challenge.end * 1000),
    price: challenge.price.toString(),
    redeemed: challenge.redeemed
    // leaderBoard: [...challenge.leaderBoard].sort((a: LeaderBoard, b: LeaderBoard) => a.time - b.time)
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

export const selectLiveChallenges = createSelector<any, any, any>(
  (reducer: any) => reducer.data,
  (state: AppState) => state.challenges.filter((challenge: Challenge) =>
    challenge.start.valueOf() <= new Date().valueOf() &&
    challenge.end.valueOf() >= new Date().valueOf()
  )
);

export const selectUpcomingChallenges = createSelector<any, any, any>(
  (reducer: any) => reducer.data,
  (state: AppState) => state.challenges.filter((challenge: Challenge) =>
    challenge.end.valueOf() >= new Date().valueOf()
  )
);

export const selectEndedChallenges = createSelector<any, any, any>(
  (reducer: any) => reducer.data,
  (state: AppState) => state.challenges.filter((challenge: Challenge) =>
    challenge.end.valueOf() < new Date().valueOf()
  )
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

export const selectTrainingsForDisplayedChallenge = createSelector<any, any, any>(
  (reducer: any) => reducer.data,
  (state: AppState,) => {
    let challenge = state.challenges.find(challenge => challenge.id === state.displayedChallenge);

    return state.concept2.data.
      filter(data => {
        console.log(new Date(data.date.replace(/-/g, "/")), (challenge as Challenge).start, (challenge as Challenge).end);
        return new Date(data.date.replace(/-/g, "/")) >= (challenge as Challenge).start
          && new Date(data.date.replace(/-/g, "/")) <= (challenge as Challenge).end

          && data.type === challenge?.ruleset.types[0]
          && data.distance === challenge.ruleset.condition[0];
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