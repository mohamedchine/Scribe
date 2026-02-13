import { create } from "zustand";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { getRecaptchaToken } from "../../utils/recaptcha";

const useAuthStore = create((set, get) => ({
  // states
  user: null,
  isEmailVerified: false,
  loading: {
    checkAuth: true,
    login: false,
    register: false,
  },

  // actions
  loginUser: async (userData) => {
    try {
      set((state) => ({
        loading: { ...state.loading, login: true },
      }));

      const recaptchatoken = await getRecaptchaToken("login");
      const { data } = await api.post("/api/auth/login", {
        ...userData,
        recaptchatoken,
      });

      set({ user: data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set((state) => ({
        loading: { ...state.loading, login: false },
      }));
    }
  },

  logoutUser: async () => {
    try {
      await api.post("/api/auth/logout");
      set({ user: null });
    } catch (error) {
      toast.error("Logout failed");
    }
  },

  registerUser: async (userData, navlog) => {
    try {
      set((state) => ({
        loading: { ...state.loading, register: true },
      }));

      const recaptchatoken = await getRecaptchaToken("register");
      const { data } = await api.post("/api/auth/register", {
        ...userData,
        recaptchatoken,
      });

      toast.success(data.message, { onClose: navlog });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Register failed");
    } finally {
      set((state) => ({
        loading: { ...state.loading, register: false },
      }));
    }
  },

  verifyEmail: async (userId, token) => {
    try {
      await api.get(`/api/auth/${userId}/verify/${token}`);
      set({ isEmailVerified: true });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Email verification failed"
      );
    }
  },

  checkAuth: async () => {
    try {
      const { data } = await api.post("/api/auth/check");
      set({ user: data });
    } catch {
      set({ user: null });
    } finally {
      set((state) => ({
        loading: { ...state.loading, checkAuth: false },
      }));
    }
  },

  setUserPhoto: (pfp) => {
    set((state) => ({
      user: { ...state.user, profilePic: pfp },
    }));
  },
}));

export { useAuthStore };