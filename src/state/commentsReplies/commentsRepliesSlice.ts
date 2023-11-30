import {CommentsListState} from "../../types.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import fetchComments from "../../helpers/fetchCommentsHelper.ts";

const initialState: CommentsListState = {
    data: []
}

export const getCommentsReplies = createAsyncThunk(
    'commentsReplies/getCommentsReplies',
    fetchComments
)

const commentsRepliesSlice = createSlice({
    name: "commentsReplies",
    initialState,
    reducers: {
        resetReplies: (state) => {
            state.data = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCommentsReplies.fulfilled, (_state, action)=> {
            let result: CommentsListState = {data: []};
            if(action.payload) {
                result = {
                    data: action.payload
                }
            }
            return result;
        })
    }
})
export const {resetReplies} = commentsRepliesSlice.actions;
export default commentsRepliesSlice.reducer;