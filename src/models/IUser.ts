export interface IUser {
    name: string,
    id: string,
    points: number,
    rewardSources?: IPointSource,
    localPoints: number,
    isAdmin: boolean
}

export interface IPointSource {
    reason: string,
    points: number,
    org?: string;
    date?: string;
    alias?: string
}