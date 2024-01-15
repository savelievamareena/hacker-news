import React from "react";
import "../App.css";
import {useNavigate, useParams} from 'react-router-dom';
import getPublicationDate from "../helpers/dateHelper.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../state/store.ts";
import {refreshStoryData, resetStoryData} from "../state/refreshData/refreshStoryDataSlice.ts";
import {NewsObj} from "../types.ts";
import {refreshCommentsData, resetCommentsData} from "../state/refreshData/refreshCommentsSlice.ts";
import CommentsBlock from "./CommentsBlock.tsx";

export default function StoryPage() {
    const navigate = useNavigate();

    function returnBack() {
        navigate("/");
    }

    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const story: NewsObj = useSelector((state: RootState) => state.storyData);

    //first load - updating the story state by story ID from params
    React.useEffect(() => {
        if(params.id) {
            dispatch(refreshStoryData(parseInt(params.id)));
            dispatch(refreshCommentsData(parseInt(params.id)));
        }

        return () => {
            dispatch(resetStoryData());
            dispatch(resetCommentsData());
        }
    }, [dispatch, params.id])

    const pubDate = getPublicationDate(story.data.time);
    const commentsNumber = story.data.kids ? story.data.kids.length : 0;

    return(
        story.status === "success" ? (
            <div className="story_wrapper_full">
                <a href={story.data.url}><h2>{story.data.title}</h2></a>
                <div className="publication_date">{pubDate}, {story.data.by}</div>
                <div className="line_block_comments">
                    <div>Comments: {commentsNumber}</div>
                    <button type="button" onClick={returnBack}>Return</button>
                </div>
                <CommentsBlock story={story.data} />
            </div>
        ) : <div>Loading...</div>
    )
}