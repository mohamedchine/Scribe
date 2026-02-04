import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./post-details.css";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import UpdatePostModal from "./UpdatePostModal";
import { useAuth } from "../../contexts&apicalls/contexts/authContext";
import { usePost } from "../../contexts&apicalls/contexts/postContext";
import { usePostApi } from "../../contexts&apicalls/apiCalls/postApiCall";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  const { post,loadingpostimg } = usePost();
  const {
    fetchSinglePost,
    deletePost,
    toggleLikePost,
    updatePostImage,
  } = usePostApi();

  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  useEffect(() => {
    fetchSinglePost(id);
    window.scrollTo(0, 0);
  }, [id]);

  const updateImageSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("postpic", file);
    await updatePostImage(formData, post?._id);
    setFile(null);
  };

  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        deletePost(post?._id, () => {
          navigate(-1);
        });
      }
    });
  };

  return (
    <section className="post-details">
      <div className="post-details-image-wrapper">
        <img
          src={file ? URL.createObjectURL(file) : post?.photo?.url}
          alt=""
          className="post-details-image"
        />
        {user?._id === post?.author?._id && (
          <form onSubmit={updateImageSubmitHandler} className="update-post-image-form">
            <label htmlFor="file" className="update-post-label">
              <i className="bi bi-image-fill"></i>
              Select new image
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            {file &&<button type="submit" disabled={loadingpostimg}>{loadingpostimg ? "loading..." : "upload"}</button>}
          </form>
        )}
      </div>

      {/* Title */}
      <h1 className="post-details-title">{post?.title}</h1>

      {/* Author Info */}
      <div className="post-details-user-info">
        <img
          src={post?.author?.profilePic?.url}
          alt=""
          className="post-details-user-image"
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.author?._id}`}>
              {post?.author?.fullname}
            </Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>

      {/* Description */}
      <p className="post-details-description">{post?.description}</p>

      {/* Like & Edit/Delete */}
      <div className="post-details-icon-wrapper">
        <div>
          {user && ( 
            <i
              onClick={() => toggleLikePost(post?._id)}
              className={
                post?.likes?.includes(user?._id)
                  ? "bi bi-hand-thumbs-up-fill"
                  : "bi bi-hand-thumbs-up"
              }
            ></i>
          )}
          <small>{post?.likes?.length} likes</small>
        </div>
        {user?._id === post?.author?._id && (
          <div>
            <i
              onClick={() => setUpdatePost(true)}
              className="bi bi-pencil-fill"
            ></i>
            <i onClick={deletePostHandler} className="bi bi-trash3-fill"></i>
          </div>
        )}
      </div>

      {/* Comments */}
      {user ? (
        <AddComment postId={post?._id} />
      ) : (
        <p className="post-details-info-write">
          To write a comment you should login first
        </p>
      )}
      <CommentList comments={post?.comments} />
      
      {/* Update Modal */}
      {updatePost && (
        <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
      )}
    </section>
  );
};

export default PostDetails;
