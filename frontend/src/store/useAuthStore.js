import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  // Check if user is authenticated
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("auth/check");
      set({ authUser: res.data });
    } catch (error) {
      if (error.response?.status === 401) {
        console.error("No user logged in yet");
      } else {
        console.error("Error in checkAuth: ", error);
      }
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Signup user
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      set({ authUser: null });
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Login user
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("auth/login", data);
      set({ authUser: res.data });

      toast.success("logged in successfully!!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      set({ authUser: null });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Logout user
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Loggedout successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error in logging out");
    }
  },
}));
