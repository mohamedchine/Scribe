import { create } from "zustand";

const usePostStore = create((set, get) => ({
  
    posts: [],
  postsCount: null,
  postsCate: [],
  loading: false,
  isPostCreated: false,
  post: null,
  loadingpostimg: false,
  loadfetchingposts: false,



  setPosts: (posts) => set({ posts }),
  setPostsCount: (count) => set({ postsCount: count }),
  setPostsCate: (postsCate) => set({ postsCate }),
  setLoading: (loading) => set({ loading }),
  setIsPostCreated: (val) => set({ isPostCreated: val }),
  setPost: (post) => set({ post }),
  setloadingpostimage: (val) => set({ loadingpostimg: val }),
  setloadfetchingposts: (val) => set({ loadfetchingposts: val }),
  setLike: (likes) => {
    set((state) => ({ post: state.post ? { ...state.post, likes } : null }));
  },
  deletePost: (postId) => {
    set((state) => ({ posts: state.posts.filter((p) => p._id !== postId) }));
  },
  addCommentToPost: (comment) => {
    set((state) => ({ post: state.post ? { ...state.post, comments: [...state.post.comments, comment] } : null }));
  },
  updateCommentPost: (updatedComment) => {
    set((state) => ({ post: state.post ? { ...state.post, comments: state.post.comments.map((c) => c._id === updatedComment._id ? updatedComment : c) } : null }));
  },


}));

export { usePostStore };
