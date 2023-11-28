import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {NewsIdsState} from "../../types.ts";

export const getNewsIds = createAsyncThunk(
    'ids/getNewsIds',
    async () => {
        const response = await fetch("https://hacker-news.firebaseio.com/v0/newstories.json");
        const data = await response.json();
        if (data.length > 20) {
            return data.slice(0, 20);
        }
        return [];
    }
);

const initialState: NewsIdsState = {
    data: [],
};

const newsIdsSlice = createSlice({
    name: "ids",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getNewsIds.fulfilled, (_state, action) => {
            return ({
                data: action.payload
            });
        });
    }
})

export default newsIdsSlice.reducer;