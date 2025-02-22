import React, { useState } from 'react'
import { Input } from '../../componets/InputBox'
import { useUserStore } from '../../store/useUserStore';
import toast from 'react-hot-toast';

function Login() {
    const[formData,setFormData] = useState({
        email: '',
        password: ''
    })
    const{userSignin,user}= useUserStore()
     // Update form data
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
      
        setFormData({
          ...formData,
          [name]: name === "year" ? Number(value) : value, // Convert year to a number
        });
      };
      
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result=await userSignin(formData); // Wait for the signup result
        if(result=='success') {
            toast.success("User signed in successfully")
        }
        else {
            toast.error("User not signed in")
        }
    };
      
  return (
    <div className="flex justify-center items-center pt-7 bg-gray-50 px-4">
      <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">User Signin</h2>
       <form onSubmit={handleSubmit} className="space-y-4">
                
                <Input placeholder="Enter your email" label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
                <Input placeholder="Enter your password" label="Password" name="password" value={formData.password} onChange={handleChange} type="password" />
                
                <div className='flex justify-center items-center'>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg transform hover:scale-105 hover:opacity-90 hover:shadow-lg transition-all duration-300 ease-in-out"
                    >
                    Submit Details
                </button>
                </div>
       </form>
       
      </div>
    </div>
  )
}

export default Login