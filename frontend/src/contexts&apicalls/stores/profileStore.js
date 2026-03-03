import { create } from "zustand";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { useAuthStore } from "./authStore";

const useProfileStore = create((set, get) => ({
  // states
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

  // setters
  setProfilePhoto: (photoUrl) => {
    set((state) => ({
      profile: state.profile ? { ...state.profile, profilePic: photoUrl } : null,
    }));
  },
  markProfileDeleted: () => {
    set((state) => ({
      isProfileDeleted: true,
      loading: { ...state.loading, delete: false },
    }));
  },
  clearProfileDeleted: () => set({ isProfileDeleted: false }),


  // API actions
  getUserProfile: async (userId) => {
    set((state) => ({ loading: { ...state.loading, getpf: true } }));

    try {
      const { data } = await api.get(`/api/users/profile/${userId}`);
      set({ profile: data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch profile.");
    } finally {
      set((state) => ({ loading: { ...state.loading, getpf: false } }));
    }
  },

  uploadProfilePhoto: async (newPhoto) => {
    set((state) => ({ loading: { ...state.loading, pfp: true } }));

    try {
      const { data } = await api.post("/api/users/uploadpfp", newPhoto, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      get().setProfilePhoto(data.profilePic);
      useAuthStore.getState().setUserPhoto(data.profilePic);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Photo upload failed.");
    } finally {
      set((state) => ({ loading: { ...state.loading, pfp: false } }));
    }
  },

  updateProfile: async (userId, profileData) => {
    set((state) => ({ loading: { ...state.loading, pf: true } }));

    try {
      const { data } = await api.put(`/api/users/profile/${userId}`, profileData);
      const updatedUser = data.updatedUser || data;

      set({ profile: updatedUser });
      useAuthStore.setState({ user: updatedUser });
      toast.success(data.message || "Profile updated successfully");
      return { success: true, data };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed.");
      throw error;
    } finally {
      set((state) => ({ loading: { ...state.loading, pf: false } }));
    }
  },

  deleteProfile: async (userId) => {
    set((state) => ({ loading: { ...state.loading, delete: true } }));

    try {
      const { data } = await api.delete(`/api/users/profile/${userId}`);
      get().markProfileDeleted();
      toast.success(data?.message);

      setTimeout(() => {
        get().clearProfileDeleted();
      }, 2000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Deletion failed.");
      set((state) => ({ loading: { ...state.loading, delete: false } }));
    }
  },

  getUsersCount: async () => {
    try {
      const { data } = await api.get("/api/users/count");
      set({ usersCount: data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch count.");
    }
  },

  getAllUsersProfile: async () => {
    try {
      const { data } = await api.get("/api/users/");
      set({ profiles: data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch profiles.");
    }
  },
}));

export { useProfileStore };
