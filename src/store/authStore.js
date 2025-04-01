import api from "@/lib/axios";
import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.post("/auth/login", credentials);

      set({
        user: data.user,
        isLoading: false,
      });

      return data.user;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      set({ user: null });
      window.location.href = "/login";
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const { data } = await api.get("/auth/me");

      set({
        user: data.user,
        isLoading: false,
      });

      return data.user;
    } catch (error) {
      set({
        user: null,
        isLoading: false,
      });
      return null;
    }
  },

  setUser: (user) => set({ user }),

  resetError: () => set({ error: null }),
}));

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default useAuthStore;
