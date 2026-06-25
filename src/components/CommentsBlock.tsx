import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store.ts";
import { getCommentsList, resetComments } from "../state/commentsList/commentsListSlice.ts";
import { refreshCommentsData } from "../state/refreshData/refreshCommentsSlice.ts";
import { CommentsBlockProps, CommentObj, StoryKids } from "../types.ts";
import fetchComments from "../helpers/fetchCommentsHelper.ts";
import getPublicationDate from "../helpers/dateHelper.ts";
import htmlDecode from "../helpers/decodeHelper.ts";

function CommentItem({ comment }: { comment: CommentObj }) {
    const [replies, setReplies] = React.useState<CommentObj[]>([]);
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    async function toggleReplies() {
        if (isExpanded) {
            setIsExpanded(false);
            return;
        }
        if (replies.length > 0) {
            setIsExpanded(true);
            return;
        }
        setIsLoading(true);
        const fetched = await fetchComments(comment.kids ?? []);
        setReplies((fetched as (CommentObj | null)[]).filter(Boolean) as CommentObj[]);
        setIsLoading(false);
        setIsExpanded(true);
    }

    const hasReplies = comment.kids && comment.kids.length > 0;
    const pubDate = getPublicationDate(comment.time);

    return (
        <div className="comment-item">
            <div className="comment-item__body">{htmlDecode(comment.text)}</div>
            <div className="comment-item__footer">
                <span className="comment-item__author">
                    {comment.by} · {pubDate}
                </span>
                {hasReplies && (
                    <button className="btn btn--sm" type="button" onClick={toggleReplies}>
                        {isLoading
                            ? "Loading…"
                            : isExpanded
                            ? "Hide replies"
                            : `Show replies (${comment.kids!.length})`}
                    </button>
                )}
            </div>
            {isExpanded && replies.length > 0 && (
                <div className="replies-list">
                    {replies.map((reply) => (
                        <div key={reply.id} className="reply-item">
                            <div className="reply-item__body">{htmlDecode(reply.text)}</div>
                            <div className="reply-item__author">
                                {reply.by} · {getPublicationDate(reply.time)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function CommentsBlock({ story }: CommentsBlockProps) {
    const dispatch = useDispatch<AppDispatch>();
    const commentsList = useSelector((state: RootState) => state.commentsList.data);
    const storyKidsData: StoryKids = useSelector((state: RootState) => state.commentsIds);

    React.useEffect(() => {
        dispatch(getCommentsList(storyKidsData.data));
        return () => {
            dispatch(resetComments());
        };
    }, [dispatch, storyKidsData.data]);

    const isLoading =
        storyKidsData.status === "pending" ||
        (storyKidsData.status === "success" &&
            storyKidsData.data.length > 0 &&
            commentsList.length === 0);
    const hasNoComments =
        storyKidsData.status === "success" && storyKidsData.data.length === 0;

    return (
        <>
            <div className="comments-list">
                {isLoading ? (
                    <div className="loading-text">Loading comments…</div>
                ) : hasNoComments ? (
                    <div className="loading-text">No comments yet.</div>
                ) : (
                    (commentsList as (CommentObj | null)[])
                        .filter(Boolean)
                        .map((comment) => (
                            <CommentItem key={(comment as CommentObj).id} comment={comment as CommentObj} />
                        ))
                )}
            </div>
            <div className="comments-refresh">
                <button
                    className="btn btn--sm"
                    type="button"
                    onClick={() => dispatch(refreshCommentsData(story.id))}
                >
                    Refresh comments
                </button>
            </div>
        </>
    );
}
