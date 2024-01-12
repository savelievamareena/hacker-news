import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {NewsListState} from "../../types.ts";
import {fetchEntity} from "../../helpers/fetchCommentsHelper.ts";

const initialState: NewsListState = {
    data: [],
};

export const getNewsList = createAsyncThunk(
    'news/getNewsList',
    async (idsArray: number[]) => {
        const fetchPromises = idsArray.map(id => {
            return fetchEntity(id, "story");
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
        builder.addCase(getNewsList.fulfilled, (state, action) => {
            state = {
                data: []
            };
            action.payload.map((story) => {
                state.data.push({
                    data: {...story},
                    status: "success"
                })
            })
            return state;
        });
    }
})

export default newsListSlice.reducer;