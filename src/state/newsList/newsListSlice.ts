// Define the initial state type
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

interface NewsListState {
    data: {
        "by": string,
        "descendants": number,
        "id": number,
        "kids": number[],
        "score": number,
        "time": Date,
        "title": string,
        "type": string,
        "url": string
    }[];
}

// Define the initial state
const initialState: NewsListState = {
    data: [],
};

export const getNewsList = createAsyncThunk(
    'list/getNewsList',
    async (idsArray: number[]) => {
        let result: NewsListState['data'] = [];
        for(let id of idsArray) {
            let urlAddress = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
            fetch(urlAddress)
                .then(response => response.json())
                .then(data => {
                    if(typeof data === "object" && data.type === "story") {
                        result.push(
                            {
                                ...data
                            }
                        );
                        console.log("RESULT:", result);
                    }
                })
        }
        return result; // Return an empty array if the condition is not met
    }
);

const newsListSlice = createSlice({
    name: "list",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getNewsList.fulfilled, (state, action) => {
            state.data.push(...action.payload); // Spread the payload array into state.data
        });
    }
})

export default newsListSlice.reducer;