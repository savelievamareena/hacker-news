import {configureStore} from "@reduxjs/toolkit";
import newsListReducer from "./newsList/newsListSlice.ts";
import newsIdsReducer from "./newsIds/newsIdsSlice.ts";
import commentsListReducer from "./commentsList/commentsListSlice.ts";

export const store = configureStore({
    reducer: {
        newsIds: newsIdsReducer,
        newsList: newsListReducer,
        commentsList: commentsListReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;