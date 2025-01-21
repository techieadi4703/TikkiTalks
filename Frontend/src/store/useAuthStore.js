import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.error("(FE) Error in checkAuth route:\n", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async(data)=>{
    set({isSigningUp: true});
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({authUser: res.data});
      toast.success("Account created successfully");
      console.log("res.data.message");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("(FE) Error in signup route:\n", error);
    }finally{
      set({isSigningUp: false});
    }
  },

  logout: async()=>{
    try {
      const res=await axiosInstance.post("/auth/logout");
      set({authUser: null});
      toast.success("Logged out successfully");
      console.log("res.data.message");
    } catch (error){
      toast.error(error.response.data.message);
      console.error("(FE) Error in logout route:\n", error);
    }
  }

}));
