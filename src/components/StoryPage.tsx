import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store.ts";
import { refreshStoryData, resetStoryData } from "../state/refreshData/refreshStoryDataSlice.ts";
import { refreshCommentsData, resetCommentsData } from "../state/refreshData/refreshCommentsSlice.ts";
import { NewsObj } from "../types.ts";
import getPublicationDate from "../helpers/dateHelper.ts";
import CommentsBlock from "./CommentsBlock.tsx";

export default function StoryPage() {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const story: NewsObj = useSelector((state: RootState) => state.storyData);

    React.useEffect(() => {
        if (params.id) {
            dispatch(refreshStoryData(parseInt(params.id)));
            dispatch(refreshCommentsData(parseInt(params.id)));
        }
        return () => {
            dispatch(resetStoryData());
            dispatch(resetCommentsData());
        };
    }, [dispatch, params.id]);

    if (story.status === "pending" || story.data.id === 0) {
        return <div className="loading-text">Loading story…</div>;
    }

    const pubDate = getPublicationDate(story.data.time);
    const commentsCount = story.data.kids?.length ?? 0;

    return (
        <div>
            <div className="story-header">
                <h2 className="story-header__title">
                    {story.data.url ? (
                        <a href={story.data.url} target="_blank" rel="noopener noreferrer">
                            {story.data.title}
                        </a>
                    ) : (
                        story.data.title
                    )}
                </h2>
                <div className="story-header__meta">
                    <span>{story.data.score} points</span>
                    <span>by {story.data.by}</span>
                    <span>{pubDate}</span>
                    <span>{commentsCount} comments</span>
                </div>
            </div>

            <div className="story-actions">
                <button className="btn" type="button" onClick={() => navigate("/")}>
                    ← Back to list
                </button>
                <span className="story-actions__label">Comments</span>
            </div>

            <CommentsBlock story={story.data} />
        </div>
    );
}
