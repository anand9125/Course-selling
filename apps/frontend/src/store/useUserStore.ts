import axios from 'axios';
import { create } from 'zustand';
import { userEndPoint } from '../utils/config';

interface User {
  id:string,
  name:string,
  email:string,
  college:string,
  branch:string,
  year:number,
  referralCodes:string,
  walletBalance:number,
  profileCompleted:boolean,
}

interface UserStore {
  user: User | null;
  isLoading: boolean;
  userSignup: (formData: any) => Promise<"success" | "failure">;
  userSignin: (formData: any) => Promise<"success" | "failure">;
}
interface FormData{
    name: string;
    email: string;
    password: string;
    collage: string;
    branch: string;
    year: number;
  }  

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,

  userSignup: async (formData: FormData) => {
    set({ isLoading: true });

    try {
      const response = await axios.post(`${userEndPoint}/user/signup`, formData);
      const userData = response.data.user;
      const token = response.data.token;
  
      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token",JSON.stringify(token)); 
        set({ user: userData, isLoading: false });
        return "success";
      } else {
        set({ isLoading: false });
        return "failure";
      }
    } catch (error) {
      console.error("Signup failed:", error);
      set({ isLoading: false });
      return "failure";
    }
  },
  userSignin: async (formData:any) => {
    set({ isLoading: true });
    try{
      const response = await axios.post(`${userEndPoint}/user/signin`, formData);
      const userData = response.data.user;
      const token = response.data.token;

      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token",JSON.stringify(token)); 
        set({ user: userData, isLoading: false });
        return "success";
      } else {
        set({ isLoading: false });
        return "failure";
      }
    }
    catch(error){
      console.error("Signin failed:", error);
      set({ isLoading: false });
      return "failure";
    }
  }}
));
