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
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("checkAuth response:", res.data); // 👈 add this
      set({ authUser: res.data });
    } catch (error) {
      console.log("checkAuth error:", error.response); // 👈 and this
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
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      throw error; // 👈 rethrow so Signup.jsx can catch it
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

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      set({ authUser: null });

      return false;
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
