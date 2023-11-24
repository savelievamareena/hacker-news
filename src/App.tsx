import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./state/store.ts";
import {getNewsList} from "./state/newsList/newsListSlice.ts"
import {getNewsIds} from "./state/newsIds/newsIdsSlice.ts";
import './App.css'

function App() {
    const newsIds = useSelector((state: RootState) => state.newsIds.data);
    console.log(newsIds)
    const newsList = useSelector((state: RootState) => {
        console.log("STATE:", state);
        return state.newsList.data
    });
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        dispatch(getNewsIds());
    }, [dispatch]);

    React.useEffect(() => {
        // Ensure newsIds is not empty
        if (newsIds.length > 0) {
            dispatch(getNewsList(newsIds));
        }
    }, [newsIds]);

    const newsEls = newsList.map((oneNew, i) => {
        return(
            <div key={i}>
                <div>{oneNew?.title}</div>
                <div>{oneNew?.by}</div>
            </div>
        )
    })

    return (
        <div>
            <button type="button" onClick={()=>{dispatch(getNewsList(newsIds))}}>Refresh News List</button>
            <div>
                {newsEls}
            </div>

        </div>
    )
}

export default App
