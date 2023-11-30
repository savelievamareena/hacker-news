import React from "react";
import "./StoryPage.css";
import {useLocation, useNavigate } from 'react-router-dom';
import getPublicationDate from "../helpers/dateHelper.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../state/store.ts";
import {getCommentsList, resetComments} from "../state/commentsList/commentsListSlice.ts";
import htmlDecode from "../helpers/decodeHelper.ts";
import {getCommentsReplies, resetReplies} from "../state/commentsReplies/commentsRepliesSlice.ts";

export default function StoryPage() {
    const navigate = useNavigate();

    const location = useLocation();
    const story = location.state;
    const commentsList = useSelector((state: RootState) => state.commentsList.data);
    const commentsReplies = useSelector((state: RootState) => state.commentsReplies.data);

    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        dispatch(getCommentsList(story.kids));

        return () => {
            dispatch(resetComments());
            dispatch(resetReplies())
        };
    }, [dispatch, story.kids]);

    function openCommentsHandler() {
        dispatch(getCommentsReplies(story.kids));
    }

    function closeCommentsHandler() {
        dispatch(resetReplies());
    }

    function returnBack() {
        navigate("/");
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

    const pubDate = getPublicationDate(story.time);
    return(
        <div className="story_wrapper_full">
            <a href={story.url}><h2>{story.title}</h2></a>
            <div className="publication_date">{pubDate}, {story.by}</div>
            <div className="line_block_comments">
                <div>
                    Comments: {story.descendants}
                </div>
                <button type="button" onClick={returnBack}>Return</button>
            </div>
            <div>
                {(story.kids !== undefined && commentsList.length === 0) ? <div>Loading Comments...</div>:  commentsEls}
            </div>
        </div>

    )
}