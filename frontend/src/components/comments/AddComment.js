import "./add-comment.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCommentStore } from "../../stores&apicalls/commentStore";

const AddComment = ({ postId }) => {
 
  const createComment = useCommentStore((state) => state.createComment);

  const [text, setText] = useState("");

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Please write something");

    await createComment({ value : text, postid : postId });
    setText("");
  };

  return (
    <form onSubmit={formSubmitHandler} className="add-comment">
      <input
        type="text"
        placeholder="Add a comment"
        className="add-comment-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="add-comment-btn">
        Comment
      </button>
    </form>
  );
};

export default AddComment;
