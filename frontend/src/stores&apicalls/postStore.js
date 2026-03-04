import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { toast } from "react-toastify";
import api from "../utils/api";
import { useProfileStore } from "./profileStore";

const usePostStore = create(
  devtools(
    (set, get) => ({
  // states
  posts: [],
  postsCache: {},
  postsCount: null,
  postsCate: [],
  loading: false,
  isPostCreated: false,
  post: null,
  loadingpostimg: false,
  loadfetchingposts: false,
  loadfetchingsinglepost:false ,

  

  // local updates
  setLike: (likes) => {
    set((state) => ({ post: state.post ? { ...state.post, likes } : null }));
  },
  removePostFromState: (postId) => {
    set((state) => ({ posts: state.posts.filter((p) => p._id !== postId) }));
  },
  addCommentToPost: (comment) => {
    set((state) => ({
      post: state.post
        ? { ...state.post, comments: [...state.post.comments, comment] }
        : null,
    }));
  },
  updateCommentPost: (updatedComment) => {
    set((state) => ({
      post: state.post
        ? {
            ...state.post,
            comments: state.post.comments.map((c) =>
              c._id === updatedComment._id ? updatedComment : c
            ),
          }
        : null,
    }));
  },
  deleteCommentFromPost: (commentId) => {
    set((state) => ({
      post: state.post
        ? {
            ...state.post,
            comments: state.post.comments.filter((c) => c._id !== commentId),
          }
        : null,
    }));
  },

  // API actions
  fetchPosts: async (pageNumber) => {
    try {
      // return cached page if available
      const cache = get().postsCache;
      if (cache && cache[pageNumber]) {
        set({ posts: cache[pageNumber] });
        return;
      }

      set({ loadfetchingposts: true });
      const { data } = await api.get(`/api/posts?pageNumber=${pageNumber}`);
      // store page in cache and update current posts
      set((state) => ({
        postsCache: { ...(state.postsCache || {}), [pageNumber]: data },
        posts: data,
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch posts");
    } finally {
      set({ loadfetchingposts: false });
    }
  },

  getPostsCount: async () => {
    try {
      const { data } = await api.get("/api/posts/count");
      set({ postsCount: data });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch posts count"
      );
    }
  },

  fetchPostsBasedOnCategory: async (category) => {
    try {
      set({ loadfetchingposts: true });
      const { data } = await api.get(`/api/posts?category=${category}`);
      set({ postsCate: data });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch posts based on this category"
      );
    }
    finally{
      set({ loadfetchingposts: false });
    }
  },

  createPost: async (newPost) => {
    try {
      set({ loading: true });
      await api.post("/api/posts/createpost", newPost, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // invalidate cache so new post appears on next fetch
      set({ loading: false, isPostCreated: true, postsCache: {} });
      setTimeout(() => set({ isPostCreated: false }), 2000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create post");
      set({ loading: false });
    }
  },

  fetchSinglePost: async (postId) => {
    try {
      set({ loadfetchingsinglepost: true });
      const { data } = await api.get(`/api/posts/${postId}`);
      set({ post: data });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch single post"
      );
    } finally {
      set({ loadfetchingsinglepost: false });
    }
  },

  toggleLikePost: async (postId) => {
    try {
      const { data } = await api.put(`/api/posts/like/${postId}`);
      get().setLike(data.likes);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to toggle like post"
      );
    }
  },

  updatePostImage: async (newImage, postId) => {
    try {
      set({ loadingpostimg: true });
      const { data } = await api.post(
        `/api/posts/${postId}/update-image/`,
        newImage
      );
      if (data.post) {
        set((state) => ({
          post: state.post ? { ...state.post, photo: data.post.photo } : null,
        }));
      }
      // toast.success("New post image uploaded successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update post image"
      );
    } finally {
      set({ loadingpostimg: false });
    }
  },

  updatePost: async (newPost, postId) => {
    try {
      const { data } = await api.put(`/api/posts/${postId}`, newPost);
      set({ post: data.newpost });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update post");
    }
  },

  deletePost: async (postId, ondone) => {
    try {
      const { data } = await api.delete(`/api/posts/${postId}`);
      get().removePostFromState(data.postId);

      // invalidate cache so deleted post is removed from cached pages
      set({ postsCache: {} });

      const profile = useProfileStore.getState().profile;
      if (profile && profile.posts) {
        useProfileStore.setState((state) => ({
          profile: {
            ...state.profile,
            posts: state.profile.posts.filter((p) => p._id !== postId),
          },
        }));
      }

      toast.success("Post has been deleted successfully", {
        autoClose: 800,
        onClose: ondone,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete post");
    }
  },

  getAllPosts: async () => {
    try {
      const { data } = await api.get("/api/posts/");
      set({ posts: data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to get all posts");
    }
  },
}),
    { name: "PostStore" }
  )
);

export { usePostStore };
