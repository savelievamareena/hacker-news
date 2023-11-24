import {configureStore} from "@reduxjs/toolkit";
import newsListReducer from "./newsList/newsListSlice.ts";
import newsIdsReducer from "./newsIds/newsIdsSlice.ts";

export const store = configureStore({
    reducer: {
        newsList: newsListReducer,
        newsIds: newsIdsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;