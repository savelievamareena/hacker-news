import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "./state/store.ts";
import { getNewsList } from "./state/newsList/newsListSlice.ts";
import { getNewsIds } from "./state/newsIds/newsIdsSlice.ts";
import getPublicationDate from "./helpers/dateHelper.ts";

export default function App() {
    const newsIds = useSelector((state: RootState) => state.newsIds.data);
    const newsList = useSelector((state: RootState) => state.newsList.data);
    const dispatch = useDispatch<AppDispatch>();

    const fetchIds = React.useCallback(() => {
        dispatch(getNewsIds());
    }, [dispatch]);

    React.useEffect(() => {
        fetchIds();
    }, [fetchIds]);

    React.useEffect(() => {
        const interval = setInterval(fetchIds, 60000);
        return () => clearInterval(interval);
    }, [fetchIds]);

    React.useEffect(() => {
        dispatch(getNewsList(newsIds));
    }, [newsIds, dispatch]);

    if (newsList.length === 0) {
        return <div className="loading-text">Loading stories…</div>;
    }

    return (
        <div>
            <div className="news-controls">
                <button className="btn" type="button" onClick={fetchIds}>
                    Refresh
                </button>
            </div>
            <div className="news-list">
                {newsList.map((item, i) => {
                    const pubDate = getPublicationDate(item.data.time);
                    return (
                        <div className="news-item" key={item.data.id}>
                            <div className="news-item__rank">{i + 1}.</div>
                            <div className="news-item__body">
                                <Link className="news-item__title" to={`/${item.data.id}`} state={item}>
                                    {item.data.title}
                                </Link>
                                <div className="news-item__meta">
                                    <span>{item.data.score} points</span>
                                    <span>by {item.data.by}</span>
                                    <span>{pubDate}</span>
                                    <span>{item.data.descendants ?? 0} comments</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
