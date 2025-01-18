import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom"
import AuthImagePattern from "./AuthImage";
import toast from "react-hot-toast";
import { backendUrl } from "../lib/backendUrl";
// import {signup} from "../Recoil/user/userApi"
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import {useSetRecoilState } from "recoil";
import { dataAtom } from "../Recoil/dataAtom";
import socket from "../store/socketConnection";
import { useNavigate } from 'react-router-dom';
type FormData = {
  fullName: string;
  username: string;
  password: string;
};
console.log(backendUrl)
function Signup() {
  const {signInWithGoogle  } = useAuth(); 
  const [showPassword,setShowPassword] = useState(false) 
  const setSignupState = useSetRecoilState(dataAtom)
  const navigate = useNavigate();
   const[formData,setFormData]= useState<FormData>({
    fullName:"",
    username:"",
    password:""
   })
  
   const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.username.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.username)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };
  
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     const success = validateForm();
    if (success === true) 
    try {
      const response = await axios.post(`${backendUrl}/signup`, formData, {
        withCredentials: true
    });
      setSignupState(response.data);
      if(response.status==200){
        localStorage.setItem('jwt', response.data.token);
        navigate('/');
      }

       console.log(response.status);  // You can handle the response as needed
      // Optionally update some other state here after the API call
     } catch (error) {
      console.error(error);  // Handle API errors
     }
     // Show validation error
  }
  const handleGoogleSignIn =async()=>{
    try{
     await signInWithGoogle()
     alert("Register successfull with google")
     socket.connect()
  
    }
    catch(e){
     alert("Google register failed")
    }
   }
    
  return <div className="min-h-screen grid lg:grid-cols-2 ">
     
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Anand"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" >
                Create Account
            </button>
            <button type="submit" className="btn btn-primary w-full "
             onClick={handleGoogleSignIn} >
                <FaGoogle  />
                Register with Google
            </button>
            {/* <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-1 bg-secondary hover:bg-blue-500 hover:text-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                    >
                        <FaGoogle  />
                        Register with Google
                    </button> */}
            
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/signin" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <div>
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>  
  </div> 

  
}


export default Signup ; 