import { Input} from "../../componets/InputBox";
import React, { useState, useEffect } from 'react';
import { useUserStore } from "../../store/useUserStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
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
  const {user,userSignup} = useUserStore()
   
  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('userFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Update form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setFormData({
      ...formData,
      [name]: name === "year" ? Number(value) : value, // Convert year to a number
    });
  };
  

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  
    const result = await userSignup(formData); // Wait for the signup result
  
    if (result === "success") {
      //  localStorage.setItem("userFormData", JSON.stringify(formData)); // Save data persistently
    
      toast.success("Signup successful!");
    } else {
      alert("Signup failed. Please try again.");
    }
  };
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  
  return (
    <div className="flex justify-center items-center pt-7 bg-gray-50 px-4">
      <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-lg">
        {/* Title */}
        {!isUserAviable 
         ?  <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">User Registration</h2>
         : <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">User Info</h2>
        }
       

        {/* Form */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Enter your branch" label="Branch" name="branch" value={userData["branch"]} onChange={handleChange} type="text" />
            <Input placeholder="Enter your year" label="Year" name="year" value={userData["year"]} onChange={handleChange} type="number" />
           
           
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            {!isUserAviable 
            ?  <div>
               <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg transform hover:scale-105 hover:opacity-90 hover:shadow-lg transition-all duration-300 ease-in-out"
                  >
                  Submit Details
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
