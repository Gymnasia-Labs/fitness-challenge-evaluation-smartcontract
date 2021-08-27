export interface Concept2 {
    name: string,
    data: Concept2Data[],
    loading: boolean
}

export interface Concept2Data {
    comments: string,
    date: string,
    date_utc: string,
    distance: number,
    id: number,
    ranked: boolean,
    source: string,
    stroke_data: boolean,
    time: number,
    time_formatted: string,
    timezone: string,
    type: string,
    user_id: number,
    verified: boolean,
    weight_class: string,
    workout_type: string
}