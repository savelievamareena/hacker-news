import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {NewsObj} from "../../types.ts";
import {fetchEntity} from "../../helpers/fetchCommentsHelper.ts";

const createInitialState = (): NewsObj => ({
    by: "",
    id: 0,
    descendants: 0,
    kids: [],
    score: 0,
    time: 0,
    title: "",
    type: "",
    url: ""
});

const initialState: NewsObj = createInitialState();

export const refreshStoryData = createAsyncThunk(
    'story/refreshStoryData',
    async (id: number) => {
        return await fetchEntity(id, "story");
    }
);

const refreshStoryDataSlice = createSlice({
    name: "story",
    initialState,
    reducers: {
        resetStoryData: createInitialState
    },
    extraReducers: (builder) => {
        builder.addCase(refreshStoryData.fulfilled, (_state, action) => {
            return {...action.payload}
        });
    }
})

export default refreshStoryDataSlice.reducer;
export const {resetStoryData} = refreshStoryDataSlice.actions;