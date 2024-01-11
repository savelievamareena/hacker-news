import React from "react";
import "./StoryPage.css";
import {useLocation, useNavigate } from 'react-router-dom';
import getPublicationDate from "../helpers/dateHelper.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../state/store.ts";
import {getCommentsList, resetComments} from "../state/commentsList/commentsListSlice.ts";
import htmlDecode from "../helpers/decodeHelper.ts";
import {getCommentsReplies, resetReplies} from "../state/commentsReplies/commentsRepliesSlice.ts";
import {refreshStoryData, resetStoryData} from "../state/refreshStoryData/refreshStoryDataSlice.ts";
import {NewsObj} from "../types.ts";

export default function StoryPage() {
    const navigate = useNavigate();

    function returnBack() {
        navigate("/");
    }

    const location = useLocation();
    const initialStoryData: NewsObj = location.state;

    const story: NewsObj = useSelector((state: RootState) => state.storyData);
    console.log(story)
    const commentsList = useSelector((state: RootState) => state.commentsList.data);
    const commentsReplies = useSelector((state: RootState) => state.commentsReplies.data);

    const dispatch = useDispatch<AppDispatch>();

    //first load - updating the story state by location
    React.useEffect(() => {
        dispatch(refreshStoryData(initialStoryData.id));

        return () => {
            dispatch(resetStoryData());
        }
    }, [dispatch, initialStoryData.id])

    //retrieving initial comments
    React.useEffect(() => {
        dispatch(getCommentsList(story.kids));

        return () => {
            dispatch(resetComments());
            dispatch(resetReplies())
        };
    },[dispatch, story.id]);

    function refreshComments() {
        dispatch(refreshStoryData(story.id));
    }

    function openCommentsHandler() {
        dispatch(getCommentsReplies(story.kids));
    }

    function closeCommentsHandler() {
        dispatch(resetReplies());
    }

    const repliesEls = commentsReplies.map((reply, id) => {
        const pubDate = getPublicationDate(reply.time);
        return(
            <div key={id} className="reply_block">
                <div>{htmlDecode(reply.text)}</div>
                <div className="publication_date">{reply.by}, {pubDate}</div>
            </div>
        )
    })

    const commentsEls = commentsList.map((comment, id) => {
        const buttonText = commentsReplies.length === 0 ? "Show replies" : "Hide";
        const clickHandler = commentsReplies.length === 0 ? openCommentsHandler : closeCommentsHandler;

        if (story.kids !== undefined && story.kids.length > 0) {
            const pubDate = getPublicationDate(comment.time);
            return (
                <div key={id} className="comment_wrapper">
                    <div>{htmlDecode(comment.text)}</div>
                    <div className="publication_date">
                        <div>{comment.by}, {pubDate}</div>
                        {comment.kids !== undefined ? <button type="button" onClick={clickHandler}>{buttonText}</button> : null}
                    </div>
                    <div className="replies_wrapper">
                        {(comment.kids !== undefined && commentsReplies.length > 0) ? repliesEls : null}
                    </div>
                </div>
            )
        }
    })

    const pubDate = getPublicationDate(initialStoryData.time);
    return(
        <div className="story_wrapper_full">
            <a href={initialStoryData.url}><h2>{initialStoryData.title}</h2></a>
            <div className="publication_date">{pubDate}, {initialStoryData.by}</div>
            <div className="line_block_comments">
                <div>
                    Comments: {initialStoryData.descendants}
                </div>
                <button type="button" onClick={returnBack}>Return</button>
            </div>
            <div>
                {(story.kids !== undefined && commentsList.length === 0) ? <div>Loading Comments...</div>:  commentsEls}
            </div>
            <div className="refresh_comments_button_wrapper">
                <button type="button" onClick={refreshComments}>Refresh</button>
            </div>
        </div>

    )
}