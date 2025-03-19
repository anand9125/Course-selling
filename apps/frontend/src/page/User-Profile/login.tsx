import React, { useState } from 'react'
import { Input } from '../../componets/InputBox'
import { useUserStore } from '../../store/useUserStore';
import Spinner from '../../componets/Skeleton/ButtonSkeleton';
import { Link, useNavigate } from 'react-router-dom';
function Login() {
    const[formData,setFormData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const{userSignin ,isLoading}= useUserStore()
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: name === "year" ? Number(value) : value, 
        });
      };

      
     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await userSignin(formData); 
    };
    
  return (
    <div className="flex justify-center items-center pt-7 bg-gray-50 px-4">
      <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">User Signin</h2>
          <form onSubmit={handleSubmit} className="space-y-4">  
              <Input placeholder="Enter your email" label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
              <Input placeholder="Enter your password" label="Password" name="password" value={formData.password} onChange={handleChange} type="password" />
              <div className='flex justify-end text-blue-500 cursor-pointer' onClick={()=>navigate("/forget-password")}>Forget password ?</div>
              <div className='flex justify-center items-center'>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg transform hover:scale-105 hover:opacity-90 hover:shadow-lg transition-all duration-300 ease-in-out"
                    >
                    {isLoading ? <Spinner size={20} className="mx-auto" /> : "Submit details"}
                </button>
                
            </div>
            <div className='flex justify-center items-center '>or
            <Link to="/user-Profile" className="text-indigo-600 hover:underline pl-1">Signup</Link>
            </div>
             
          </form>
      </div>
    </div>
  )
}

export default Login