export interface NewsIdsState {
    data: number[];
}

export interface NewsObj {
    by: string,
    descendants: number,
    id: number,
    kids: number[] | null,
    score: number,
    time: number,
    title: string,
    type: string,
    url: string
}

export interface NewsListState {
    data: NewsObj[];
}

export interface CommentObj {
    by : string,
    id : number,
    kids : number[] | null,
    parent : number,
    text : string,
    time : number,
    type : string
}

export interface CommentsListState {
    data: CommentObj[];
}