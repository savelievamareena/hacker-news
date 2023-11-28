import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CommentsListState} from "../../types.ts";

const initialState: CommentsListState = {
    data: [],
};

export const getCommentsList = createAsyncThunk(
    'comments/getCommentsList',
    async (idsArray: number[]) => {
        const fetchPromises = idsArray.map(id => {
            const urlAddress = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
            return fetch(urlAddress)
                .then(response => response.json())
                .then(data => {
                    if(typeof data === "object" && data.type === "comment") {
                        return data;
                    }
                    return null;
                });
        });
        return await Promise.all(fetchPromises);
    }
)

const commentsListSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getCommentsList.fulfilled, (_state, action) => {
            return ({
                data: action.payload
            });
        });
    }
})

export default commentsListSlice.reducer;