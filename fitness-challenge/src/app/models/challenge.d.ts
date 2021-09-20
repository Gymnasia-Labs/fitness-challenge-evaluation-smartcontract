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
    price: number,
    leaderBoard: LeaderBoard[];
    fee: number,
    currentParticipantsCount: number,
    maxParticipantsCount: number
}

export interface LeaderBoard {
    challenger: string,
    data: number,
    time: number
}