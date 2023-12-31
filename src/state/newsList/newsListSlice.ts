import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {NewsListState} from "../../types.ts";

const initialState: NewsListState = {
    data: [],
};

export const getNewsList = createAsyncThunk(
    'news/getNewsList',
    async (idsArray: number[]) => {
        const fetchPromises = idsArray.map(id => {
            const urlAddress = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
            return fetch(urlAddress)
                .then(response => response.json())
                .then(data => {
                    if(typeof data === "object" && data.type === "story") {
                        return data;
                    }
                    return null;
                });
        });

        return await Promise.all(fetchPromises);
    }
);

const newsListSlice = createSlice({
    name: "news",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getNewsList.fulfilled, (_state, action) => {
            return ({
                data: action.payload
            });
        });
    }
})

export default newsListSlice.reducer;