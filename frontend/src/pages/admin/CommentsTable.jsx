import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import swal from "sweetalert";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useComment } from "../../contexts&apicalls/contexts/commentContext";
import { useCommentApi } from "../../contexts&apicalls/apiCalls/commentApiCall";

const CommentsTable = () => {
  const { comments } = useComment();
  const { fetchAllComments, deleteComment } = useCommentApi();

  useEffect(() => {
    fetchAllComments();
  }, []);

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteComment(commentId);
      }
    });
  };

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Comments</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th className="action-column">Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item.author?.profilePic?.url }
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">
                      {item.author.fullname}
                    </span>
                  </div>
                </td>
                <td>
                  <Link
                    to={`/posts/details/${item.postid}`}
                    className="comment-link"
                  >
                    {item.value}
                  </Link>
                </td>
                <td className="action-column">
                  <div className="table-button-group">
                    <button onClick={() => deleteCommentHandler(item._id)}>
                      Delete Comment
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CommentsTable;
