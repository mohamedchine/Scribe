import "./comment-list.css";
import swal from "sweetalert";
import { useState } from "react";
import { Link } from "react-router-dom";
import UpdateCommentModal from "./UpdateCommentModal";
import Moment from "react-moment";
import { useCommentApi } from "../../contexts&apicalls/apiCalls/commentApiCall";
import { useAuth } from "../../contexts&apicalls/contexts/authContext";

const CommentList = ({ comments }) => {
  const { user } = useAuth();
  const { deleteComment } = useCommentApi(user);

  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);

  // Update Comment Handler
  const updateCommentHandler = (comment) => {
    console.log(comment);
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        deleteComment(commentId);
      }
    });
  };

  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length} Comments</h4>
      {comments?.map((comment) => (
        <div key={comment._id} className="comment-item">
          <div className="comment-item-info">
            <div className="comment-item-username">
              <Link to={`/profile/${comment.author._id}`}>
                {comment.author.fullname}
              </Link>
            </div>
            <div className="comment-item-time">
              <Moment fromNow ago>
                {comment.createdAt}
              </Moment>{" "}
              ago
            </div>
          </div>
          <p className="comment-item-text">{comment.value}</p>
          {user?._id === comment.author._id && (
            <div className="comment-item-icon-wrapper">
              <i
                onClick={() => updateCommentHandler(comment)}
                className="bi bi-pencil-fill"
              ></i>
              <i
                onClick={() => deleteCommentHandler(comment._id)}
                className="bi bi-trash3-fill"
              ></i>
            </div>
          )}
        </div>
      ))}
      {updateComment && (
        <UpdateCommentModal
          commentForUpdate={commentForUpdate}
          setUpdateComment={setUpdateComment}
        />
      )}
    </div>
  );
};

export default CommentList;
