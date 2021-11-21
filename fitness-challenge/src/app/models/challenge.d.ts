export interface Challenge {
    id: number,
    title: string,
    description: string,
    image: string,
    rules: string[],
    creator: string,
    creationTime: Date,
    start: Date,
    end: Date,
    participants: number,
    price: string,
    leaderBoard: LeaderBoard[];
    fee: string,
    currentParticipantsCount: number,
    maxParticipantsCount: number,
    redeemed: boolean,
    ruleset: Ruleset
}

export interface LeaderBoard {
    challenger: string,
    data: number,
    time: number
}

export interface Ruleset {
    conditions: number[],
    types: string[]
}