export interface NewsIdsState {
    data: number[];
}

export interface NewsObj {
    data: StoryProps,
    status: "success" | "pending" | "error"
}

export interface StoryProps {
    by: string,
    descendants: number,
    id: number,
    kids: number[] | undefined,
    score: number,
    time: number,
    title: string,
    type: string,
    url: string
}

export interface CommentsBlockProps {
    story: StoryProps
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

export interface StoryKids {
    data: number[],
    status: "success" | "pending" | "error"
}