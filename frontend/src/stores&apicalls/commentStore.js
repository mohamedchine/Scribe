import { create } from "zustand";
import { toast } from "react-toastify";
import api from "../utils/api";
import { usePostStore } from "./postStore";

const useCommentStore = create((set, get) => ({
  // states
  comments: [],
  loading: {
    create: false,
    update: false,
    delete: false,
    fetch: false,
  },

 //actions

  // Create Comment
  createComment: async (newComment) => {
    set((state) => ({ loading: { ...state.loading, create: true } }));

    try {
      const { data } = await api.post("/api/comments", newComment);

      set((state) => ({ comments: [...state.comments, data] }));
    
      const addCommentToPost = usePostStore.getState().addCommentToPost;
      addCommentToPost(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create comment");
    } finally {
      set((state) => ({ loading: { ...state.loading, create: false } }));
    }
  },

  // Update Comment
  updateComment: async (commentId, comment) => {
    set((state) => ({ loading: { ...state.loading, update: true } }));

    try {
      const { data } = await api.put(`/api/comments/${commentId}`, comment);

      set((state) => ({
        comments: state.comments.map((c) => (c._id === data._id ? data : c)),
      }));
    
      const updateCommentPost = usePostStore.getState().updateCommentPost;
      updateCommentPost(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update comment");
    } finally {
      set((state) => ({ loading: { ...state.loading, update: false } }));
    }
  },

  // Delete Comment
  deleteComment: async (commentId) => {
    set((state) => ({ loading: { ...state.loading, delete: true } }));

    try {
      await api.delete(`/api/comments/${commentId}`);

      set((state) => ({
        comments: state.comments.filter((c) => c._id !== commentId),
      }));
      
      const deleteCommentFromPost = usePostStore.getState().deleteCommentFromPost;
      deleteCommentFromPost(commentId);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete comment");
    } finally {
      set((state) => ({ loading: { ...state.loading, delete: false } }));
    }
  },

  // Fetch All Comments
  fetchAllComments: async () => {
    set((state) => ({ loading: { ...state.loading, fetch: true } }));

    try {
      const { data } = await api.get("/api/comments");
      set({ comments: data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch comments");
    } finally {
      set((state) => ({ loading: { ...state.loading, fetch: false } }));
    }
  },
}));

export { useCommentStore };
