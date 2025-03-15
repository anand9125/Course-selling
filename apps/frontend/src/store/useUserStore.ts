import axios from 'axios';
import { create } from 'zustand';
import { userEndPoint } from '../config';
import toast from 'react-hot-toast';

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
  userWalletBalance:(userId:string)=>Promise<void>
  walletBalance:null|number
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
  walletBalance:null,
  

  userSignup: async (formData: FormData) => {
    set({ isLoading: true });

    try {
      const response = await axios.post(`${userEndPoint}/user/signup`, formData);
      if(response.status==202)toast.success("Admin login successfull")
        console.log(response.status)
      const userData = response.data.user;
      const token = response.data.token;
      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token",JSON.stringify(token)); 
        set({ user: userData, isLoading: false });
        toast.success("Signin successful")
        return "success";
      } else {
        set({ isLoading: false });
        return "failure";
      }
    } catch (error:any) {
      console.error("Signup failed:", error);
      if(error.status==403){
        toast.error("User already exists please login")
      }
      if(error.status==401){
        toast.error("Invalid Credentials")
      }
      if(error.status==500){
        toast.error("Internal Server Error")
      }
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
        toast.success("Signin successful")
        return "success";
      } else {
        set({ isLoading: false });
        
        return "failure";
      }
    }
    catch(error:any){
      console.error("Signin failed:", error);
      set({ isLoading: false });
      if(error.status==401){
        toast.error("Invalid Credentials")
      }
      if(error.status==404){
        toast.error("User is not found please Signup")
      }
      if(error.status==403){
        toast.error("Invalid Password")
      }
      if(error.status==500){
        toast.error("Internal Server Error")
      }
      return "failure";
    }
  },
userWalletBalance:async(userId:string)=>{
    try{
      const response = await axios.get(`${userEndPoint}/user/wallet/${userId}`);
      set({walletBalance:response.data.walletBalance}) 
     }
    catch(error:any){
      console.error("Failed to get wallet balance:", error)
    }
}}
));
