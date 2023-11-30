import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CommentsListState} from "../../types.ts";
import fetchComments from "../../helpers/fetchCommentsHelper.ts";

const initialState: CommentsListState = {
    data: [],
};

export const getCommentsList = createAsyncThunk(
    'comments/getCommentsList',
    fetchComments
)

const commentsListSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        resetComments: (state) => {
            state.data = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCommentsList.fulfilled, (_state, action) => {
            let result: CommentsListState = {data: []};
            if(action.payload) {
                result = {
                    data: action.payload
                }
            }
            return result;
        });
    }
})

export const {resetComments}  = commentsListSlice.actions;
export default commentsListSlice.reducer;