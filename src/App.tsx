import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./state/store.ts";
import {getNewsList} from "./state/newsList/newsListSlice.ts"
import {getNewsIds} from "./state/newsIds/newsIdsSlice.ts";
import './App.css'
import {Link} from "react-router-dom";
import getPublicationDate from "./helpers/dateHelper.ts";

export default function App() {
    const newsIds = useSelector((state: RootState) => state.newsIds.data);
    const newsList = useSelector((state: RootState) => state.newsList.data);
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        dispatch(getNewsIds());
    }, [dispatch]);

    React.useEffect(() => {
        if (newsIds.length > 0) {
            dispatch(getNewsList(newsIds));
        }
    },[newsIds, dispatch]);

    function handleUpdateFeed() {
        dispatch(getNewsIds());
    }

    const newsEls = newsList.map((oneNew, i) => {
        const pubDate = getPublicationDate(oneNew.time);
        const href = "/" + oneNew.id;
        return(
            <Link key={i} to={href} state={oneNew}>
                <div className="story_wrapper">
                    <div className="story_title">{oneNew?.title}</div>
                    <div>{oneNew?.by}</div>
                    <div>Score: {oneNew?.score}</div>
                    <div>{pubDate}</div>
                </div>
            </Link>
        )
    })

    return (
        <div className="main_content_wrapper">
            <div>
                {newsList.length > 0 ? newsEls : "Loading..."}
            </div>
            <div className="button_container">
                <button type="button" onClick={()=>{handleUpdateFeed()}}>Refresh News List</button>
            </div>
        </div>
    )
}
