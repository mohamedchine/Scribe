import { useState } from "react";
import "./update-comment.css";
import { toast } from "react-toastify";
import { useCommentApi } from "../../contexts&apicalls/apiCalls/commentApiCall";
import { useAuth } from "../../contexts&apicalls/contexts/authContext";


const UpdateCommentModal = ({ setUpdateComment, commentForUpdate }) => {
  const { user } = useAuth(); 
  const { updateComment } = useCommentApi(user);

  const [text, setText] = useState(commentForUpdate?.value);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Please write something");

    await updateComment(commentForUpdate?._id, { value : text });
    setUpdateComment(false);
  };

  return (
    <div className="update-comment">
      <form onSubmit={formSubmitHandler} className="update-post-form">
        <abbr title="close">
          <i
            onClick={() => setUpdateComment(false)}
            className="bi bi-x-lg update-comment-form-close"
          ></i>
        </abbr>
        <h1 className="update-comment-title">Edit Comment</h1>
        <input
          type="text"
          className="update-comment-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="update-comment-btn">
          Edit Comment
        </button>
      </form>
    </div>
  );
};

export default UpdateCommentModal;
