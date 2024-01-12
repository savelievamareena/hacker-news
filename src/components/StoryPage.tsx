import React from "react";
import "./StoryPage.css";
import {useNavigate, useParams} from 'react-router-dom';
import getPublicationDate from "../helpers/dateHelper.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../state/store.ts";
import {getCommentsList, resetComments} from "../state/commentsList/commentsListSlice.ts";
import htmlDecode from "../helpers/decodeHelper.ts";
import {getCommentsReplies, resetReplies} from "../state/commentsReplies/commentsRepliesSlice.ts";
import {refreshStoryData, resetStoryData} from "../state/refreshData/refreshStoryDataSlice.ts";
import {NewsObj, StoryKids} from "../types.ts";
import {refreshCommentsData, resetCommentsData} from "../state/refreshData/refreshCommentsSlice.ts";

export default function StoryPage() {
    const navigate = useNavigate();

    function returnBack() {
        navigate("/");
    }

    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const story: NewsObj = useSelector((state: RootState) => state.storyData);
    const commentsList = useSelector((state: RootState) => state.commentsList.data);
    const commentsReplies = useSelector((state: RootState) => state.commentsReplies.data);
    const storyKidsData: StoryKids = useSelector((state: RootState) => state.commentsIds)

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

    //retrieving initial comments
    React.useEffect(() => {
        dispatch(getCommentsList(storyKidsData.data));

        return () => {
            dispatch(resetComments());
            dispatch(resetReplies())
        };
    },[dispatch, storyKidsData.data]);

    //update comments ids on click
    function refreshCommentsHandler() {
        dispatch(refreshCommentsData(story.data.id));
    }

    function openCommentsHandler() {
        dispatch(getCommentsReplies(story.data.kids));
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

        if (story.data.kids !== undefined && story.data.kids.length > 0) {
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

    const pubDate = getPublicationDate(story.data.time);
    return(
        story.status === "success" ? (
            <div className="story_wrapper_full">
                <a href={story.data.url}><h2>{story.data.title}</h2></a>
                <div className="publication_date">{pubDate}, {story.data.by}</div>
                <div className="line_block_comments">
                    <div>Comments: {story.data.descendants}</div>
                    <button type="button" onClick={returnBack}>Return</button>
                </div>
                <div>
                    {storyKidsData.status !== "success" ? <div>Loading Comments...</div> : commentsEls}
                </div>
                <div className="refresh_comments_button_wrapper">
                    <button type="button" onClick={refreshCommentsHandler}>Refresh</button>
                </div>
            </div>
        ) : <div>Loading...</div>
    )
}