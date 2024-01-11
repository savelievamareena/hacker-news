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

    function handleUpdateFeed() {
        dispatch(getNewsIds());
    }

    React.useEffect(() => {
        handleUpdateFeed();
    },[dispatch]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            console.log("interval:", interval, Date.now());
            handleUpdateFeed();
        }, 60000);
        return () => {
            clearInterval(interval)
        };
    },[dispatch])

    React.useEffect(() => {
        dispatch(getNewsList(newsIds));
    },[newsIds, dispatch]);

    const newsEls = newsList.map((oneNew, i) => {
        const pubDate = getPublicationDate(oneNew.time);
        const href = "/" + oneNew.id;
        return(
            <div className="left_column" key={i}>
                <Link to={href} state={oneNew}>
                    <div className="story_wrapper">
                        <div className="story_title">{oneNew?.title}</div>
                        <div className="publication_date">{oneNew?.by}, {pubDate}</div>
                        <div>Score: {oneNew?.score}</div>
                        <div className="publication_date">Comments: {oneNew.descendants}</div>
                    </div>
                </Link>
            </div>

        )
    })

    return (
        <div className="main_content_wrapper">
            <div className="button_container">
                <button type="button" onClick={handleUpdateFeed}>Refresh News List</button>
            </div>
            {newsList.length > 0 ? newsEls : <div className="left_column">Loading...</div>}
        </div>
    )
}
