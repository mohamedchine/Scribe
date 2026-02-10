import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  // state
  user: null,
  loading: { checkAuth: true },

  // actions
  login: (userdata) => {
    set({ user: userdata });
  },

  logout: () => {
    set({ user: null });
  },

  setUserPhoto: (pfp) => {
    set((state) => ({
      user : 
         { ...state.user, profilePic: pfp }
    }));
  },
}));

export { useAuthStore };