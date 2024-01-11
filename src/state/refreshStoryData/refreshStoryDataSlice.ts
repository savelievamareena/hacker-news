import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {NewsObj} from "../../types.ts";

const initialState: NewsObj = {
    by: "",
    id: 0,
    descendants: 0,
    kids: [],
    score: 0,
    time: 0,
    title: "",
    type: "",
    url: ""
};

export const refreshStoryData = createAsyncThunk(
    'story/refreshStoryData',
    async (id: number) => {
        const urlAddress = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
        console.log(urlAddress)
        return await fetch(urlAddress)
            .then(response => response.json())
            .then(data => {
                if(typeof data === "object" && data.type === "story") {
                    return data;
                }
                return null;
            });
    }
);

const refreshStoryDataSlice = createSlice({
    name: "story",
    initialState,
    reducers: {
        resetStoryData: () => {
            return {
                by: "",
                id: 0,
                descendants: 0,
                kids: [],
                score: 0,
                time: 0,
                title: "",
                type: "",
                url: ""
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(refreshStoryData.fulfilled, (_state, action) => {
            return {...action.payload}
        });
    }
})

export default refreshStoryDataSlice.reducer;
export const {resetStoryData} = refreshStoryDataSlice.actions;