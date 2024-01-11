import {configureStore} from "@reduxjs/toolkit";
import newsListReducer from "./newsList/newsListSlice.ts";
import newsIdsReducer from "./newsIds/newsIdsSlice.ts";
import commentsListReducer from "./commentsList/commentsListSlice.ts";
import commentsRepliesReducer from "./commentsReplies/commentsRepliesSlice.ts";
import refreshStoryDataSlice from "./refreshStoryData/refreshStoryDataSlice.ts";

export const store = configureStore({
    reducer: {
        newsIds: newsIdsReducer,
        newsList: newsListReducer,
        commentsList: commentsListReducer,
        commentsReplies: commentsRepliesReducer,
        storyData: refreshStoryDataSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;