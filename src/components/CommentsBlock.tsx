import React from "react";
import {CommentsBlockProps, StoryKids} from "../types.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../state/store.ts";
import getPublicationDate from "../helpers/dateHelper.ts";
import htmlDecode from "../helpers/decodeHelper.ts";
import {getCommentsReplies, resetReplies} from "../state/commentsReplies/commentsRepliesSlice.ts";
import {refreshCommentsData} from "../state/refreshData/refreshCommentsSlice.ts";
import {getCommentsList, resetComments} from "../state/commentsList/commentsListSlice.ts";

export default function CommentsBlock({story}: CommentsBlockProps ) {
    const dispatch = useDispatch<AppDispatch>();

    const commentsList = useSelector((state: RootState) => state.commentsList.data);
    const commentsReplies = useSelector((state: RootState) => state.commentsReplies.data);
    const storyKidsData: StoryKids = useSelector((state: RootState) => state.commentsIds);

    //retrieving initial comments
    React.useEffect(() => {
        dispatch(getCommentsList(storyKidsData.data));

        return () => {
            dispatch(resetComments());
            dispatch(resetReplies())
        };
    },[dispatch, storyKidsData.data]);

    function refreshCommentsHandler() {
        dispatch(refreshCommentsData(story.id));
    }

    function openCommentsHandler(repliesIds: number[]) {
        dispatch(getCommentsReplies(repliesIds));
    }

    function closeCommentsHandler() {
        dispatch(resetReplies());
    }

    const repliesEls = commentsReplies.map((reply) => {
        const pubDate = getPublicationDate(reply.time);
        return(
            <div key={reply.id} className="reply_block">
                <div>{htmlDecode(reply.text)}</div>
                <div className="publication_date">{reply.by}, {pubDate}</div>
            </div>
        )
    })

    const commentsEls = commentsList.map((comment) => {
        const buttonText = commentsReplies.length === 0 ? "Show replies" : "Hide";
        let repliesIds: number[] = [];
        if(comment.kids !== null) {
            repliesIds = comment.kids;
        }
        const clickHandler = commentsReplies.length === 0 ? () => {openCommentsHandler(repliesIds)} : closeCommentsHandler;

        if (story.kids !== undefined && story.kids.length > 0) {
            const pubDate = getPublicationDate(comment.time);
            return (
                <div key={comment.id} className="comment_wrapper">
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

    return(
        <>
            <div>
                {storyKidsData.status === "success" && storyKidsData.data.length > 0 ? commentsEls : <div>Loading Comments...</div>}
            </div>
            <div className="refresh_comments_button_wrapper">
                <button type="button" onClick={refreshCommentsHandler}>Refresh</button>
            </div>
        </>
    )
}