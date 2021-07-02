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

}