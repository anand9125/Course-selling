import { Input} from "../../componets/InputBox";
import React, { useState, useEffect } from 'react';
import { useUserStore } from "../../store/useUserStore";
import { Link } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";

import toast from "react-hot-toast";
import Spinner from "../../componets/Skeleton/ButtonSkeleton";
// import Banner from "../../componets/Profile-popup";
function User() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    branch: '',
    year: 0,
    category: '',
  });
 
  const isUserAviable = localStorage.getItem("user")
  const {userSignup ,isLoading} = useUserStore()
   
  useEffect(() => {
    const savedData = localStorage.getItem('userFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setFormData({
      ...formData,
      [name]: name === "year" ? Number(value) : value, 
    });
  };
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully")
    window.location.href = "/";

  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await userSignup(formData); 
  };

  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  
  
  return (
    
    <div className="flex justify-center items-center pt-7 bg-gray-50 px-4">
      <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-lg">
        {!isUserAviable 
         ? 
         <div>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">User Registration</h2>
         </div>
         :
         <div className="p-4">
         <div className="flex justify-center items-center text-2xl font-bold text-gray-800 text-center mb-6">
           User Info
         </div>
         <div className="flex justify-end items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-800 transition"
            onClick={()=>handleLogout()}>
           <LuLogOut className="text-xl" />
           <span className="font-medium">Logout</span>
         </div>
       </div>       
        
        }
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Enter your name" label="Full Name" name="name" value={userData["name"]} onChange={handleChange} type="text" />

          <div className="w-full ">
            <div className="">
               <Input placeholder="Enter your email" label="Email" name="email" value={userData["email"]} onChange={handleChange} type="email" />
               {!isUserAviable && 
               <Input placeholder="Enter your password" label="Password" name="password" value={userData["password"]} onChange={handleChange} type="password" />}
            </div>
          </div>

            <Input placeholder="Enter your college name" label="College Name" name="college" value={userData["college"]} onChange={handleChange} type="text" />

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Enter your branch" label="Branch" name="branch" value={userData["branch"]} onChange={handleChange} type="text" />
            <Input placeholder="Enter your year" label="Year" name="year" value={userData["year"]} onChange={handleChange} type="number" />
          </div> */}

          <div className="flex justify-center mt-6">
            {!isUserAviable 
            ? <div>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg transform hover:scale-105 hover:opacity-90 hover:shadow-lg transition-all duration-300 ease-in-out"
                    >
                   {isLoading ? <Spinner size={20} className="mx-auto" /> : "Submit details"}
                  </button>
                  <div className="text-center mt-2">
                    or <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
                  </div>
              </div>
              
            : ""}
           
          </div>
        </form>
      </div>
    </div>
  );
}

export default User;
