import React from "react";
import "./StoryPage.css";
import {useLocation} from 'react-router-dom';
import getPublicationDate from "../helpers/dateHelper.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../state/store.ts";
import {getCommentsList} from "../state/commentsList/commentsListSlice.ts";
import htmlDecode from "../helpers/decodeHelper.ts";

export default function StoryPage() {
    const location = useLocation();
    const story = location.state;
    const commentsList = useSelector((state: RootState) => state.commentsList.data);

    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(()=> {
        if(story.kids !== undefined) {
            dispatch(getCommentsList(story.kids));
        }
    },[dispatch, story.kids])

    const commentsEls = commentsList.map((comment, id) => {
        const pubDate = getPublicationDate(comment.time);
        return(
            <div key={id} className="comment_wrapper">
                <div>{htmlDecode(comment.text)}</div>
                <div className="publication_date">{comment.by}, {pubDate}</div>
            </div>
        )
    })

    const pubDate = getPublicationDate(story.time);

    return(
        <div className="story_wrapper_full">
            <a href={story.url}><h2>{story.title}</h2></a>
            <div className="publication_date">{pubDate}, {story.by}</div>
            <div>Comments: {story.descendants}</div>
            <div>
                {commentsList ? commentsEls : "Loading Comments..."}
            </div>
        </div>
    )
}