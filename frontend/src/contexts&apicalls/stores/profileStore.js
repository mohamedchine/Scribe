import { create } from "zustand";

const useProfileStore = create((set, get) => ({
  profile: null,
  loading: {
    pfp: false,
    pf: false,
    getpf: false,
    delete: false,
  },
  isProfileDeleted: false,
  usersCount: null,
  profiles: [],
  
  
  
  setProfile: (profile) => set({ profile }),
  setProfilePhoto: (photoUrl) => {
    set((state) => ({ profile: state.profile ? { ...state.profile, profilePic: photoUrl } : null }));
  },
  setLoading: (loading) => set({ loading }),
  markProfileDeleted: () => {
    set({ isProfileDeleted: true, loading: { ...get().loading, delete: false } });
  },
  clearProfileDeleted: () => set({ isProfileDeleted: false }),
  setUsersCount: (count) => set({ usersCount: count }),
  setProfiles: (profiles) => set({ profiles }),
}));

export { useProfileStore };
