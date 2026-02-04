import api from "../../utils/api";
import { toast } from "react-toastify";
import { useComment } from "../contexts/commentContext";
import { usePost } from "../contexts/postContext";

export const useCommentApi = () => {
  const { setComments, deleteComment: removeFromComments } = useComment();
  const {
    addCommentToPost,
    updateCommentPost,
    deleteCommentFromPost,
  } = usePost();

  //  Create Comment
  const createComment = async (newComment) => {

    try {
      const { data } = await api.post("/api/comments", newComment);
      addCommentToPost(data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  //  Update Comment
  const updateComment = async (commentId, comment) => {
    try {
      const { data } = await api.put(
        `/api/comments/${commentId}`,
        comment
      );
      updateCommentPost(data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  //  Delete Comment
  const deleteComment = async (commentId) => {
    try {
      await api.delete(`/api/comments/${commentId}`);
      removeFromComments(commentId); // context state
      deleteCommentFromPost(commentId); // inside post.comments
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  // Fetch All Comments
  const fetchAllComments = async () => {
    try {
      const { data } = await api.get(`/api/comments`);
      setComments(data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return {
    createComment,
    updateComment,
    deleteComment,
    fetchAllComments,
  };
};

