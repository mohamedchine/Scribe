import { create } from "zustand";

const useCommentStore = create((set, get) => ({
  comments: [],
  setComments: (comments) => {
    set({ comments });
  },
  deleteComment: (_id) => {
    set((state) => ({ comments: state.comments.filter((c) => c._id !== _id) }));
  },
}));

export { useCommentStore };
