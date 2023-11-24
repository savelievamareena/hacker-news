// Define the initial state type
import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create async thunk
export const getNewsIds = createAsyncThunk(
    'ids/getNewsIds',
    async () => {
        const response = await fetch("https://hacker-news.firebaseio.com/v0/newstories.json");
        const data = await response.json();
        if (data.length > 10) {
            return data.slice(0, 10); // Return the sliced data
        }
        return []; // Return an empty array if the condition is not met
    }
);

interface NewsIdsState {
    data: number[];
}

// Define the initial state
const initialState: NewsIdsState = {
    data: [],
};

const newsIdsSlice = createSlice({
    name: "ids",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getNewsIds.fulfilled, (state, action) => {
            state.data.push(...action.payload); // Spread the payload array into state.data
        });
    }
})

export default newsIdsSlice.reducer;