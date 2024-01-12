import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchEntity} from "../../helpers/fetchCommentsHelper.ts";
import {StoryKids} from "../../types.ts";

const initialState: StoryKids = {
    data: [],
    status: "success"
}

export const refreshCommentsData = createAsyncThunk(
    'story/refreshCommentsData',
    async (id: number) => {
        return await fetchEntity(id, "story");
    }
);

const refreshCommentsDataSlice = createSlice({
    name: "story",
    initialState,
    reducers: {
        resetCommentsData: (state) => {
            state = {
                data: [],
                status: "success"
            }
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(refreshCommentsData.fulfilled,
                (state, action) => {
                    if(action.payload.descendants !== 0) {
                        state.data = [...action.payload.kids]
                    }
                    state.status = "success"
                    return state;
                }
            )
            .addCase(refreshCommentsData.pending,
                (state) => {
                    state.status = "pending";
                    return state;
                }
            );
    }
})

export default refreshCommentsDataSlice.reducer;
export const {resetCommentsData} = refreshCommentsDataSlice.actions;