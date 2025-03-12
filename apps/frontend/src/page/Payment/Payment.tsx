import { useState } from 'react';
import { Input } from '../../componets/InputBox'
import axios from 'axios';
import { userEndPoint } from '../../config';
function Payment() {
    const[formData,setFormData] = useState({
      userId:"",
        amount:0,
        courseId:""
    })
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       
            const { name, value } = e.target;
            setFormData({
              ...formData,
              [name]: name === "amount" ? Number(value) : value, 
            });
          };
          
         const handleSubmit = async (e: React.FormEvent) => {
          console.log(formData)
            e.preventDefault();
           const response= await axios.post(`${userEndPoint}/payment/pay`,formData,{
              headers:{
                "Content-Type":"application/json"
              }})
              if(response){
                window.location.href = response.data.paymentUrl;
              }
              
        };
  return (
    <div>
        <div className="flex justify-center items-center pt-7 bg-gray-50 px-4">
              <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">User Signin</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">  
                      <Input placeholder="Enter your userId" label="userId" name="userId" value={formData.userId} onChange={handleChange} type="text" />
                      <Input placeholder="Enter your courseId" label="courseId" name="courseId" value={formData.courseId} onChange={handleChange} type="text" />
                      <Input placeholder="Enter your amount" label="amount" name="amount" value={formData.amount} onChange={handleChange} type="number" />
                      
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
    </div>
  )
}

export default Payment