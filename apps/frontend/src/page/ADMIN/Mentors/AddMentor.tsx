import  { useState } from 'react'
import {InputField} from '../../../AdminComponents/InputField';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { adminEndPoint } from '../../../utils/config';
import toast from 'react-hot-toast';

const AddMentor = () => {
    const { register, handleSubmit } = useForm();
    const[isLoading,setIsLoading]=useState('true')
    const [isChecked, setIsChecked] = useState(false);
    const token = JSON.parse(localStorage.getItem("token") || "{}");
    
    
     const onSubmit = async (data:any) => {
    data.index= Number(data.index)
    data.categoryIndex = Number(data.categoryIndex)
    console.log(data)
 
    try{
      const response= await axios.post(`${adminEndPoint}/mentor/create`,data,{
        headers:{
          "Authorization":token,
          "Content-Type":"application/json"
        }
      })
      
      
      if(response.status==201){
        setIsLoading("false")
        toast.success("Mentor added successfully")
      }
    }catch(error:any){
     toast.error("Failed to add Mentor",error)
    }
    }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };


   
  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Mentor</h2>

     
      <form onSubmit={handleSubmit(onSubmit)} className=''>
       
        <InputField
          label="Mentor Name"
          name="name"
          type="string"
          placeholder="Enter Mentor Name"
          register={register}
        />

        <InputField
          label="Index"
          name="index"
          placeholder="Enter Categregory Index"
          type="number"
          register={register}

        />

        <InputField
          label="Image Link"
          name="image"
          type="string"
          placeholder="Enter image link for this Mentor"
          register={register}
         
        />

        {/* New Price */}
        <InputField
          label="Mentor Id"
          name="mentorId"
          type="string"
          placeholder="Enter MentorId for this Mentor"
          register={register}
          
        />
        <InputField
          label="Category Id"
          name="categoryId"
          type="string"
          placeholder="Enter category id for this Mentor"
          register={register}
          
        />
         <div className="mb-4">
            <label className="inline-flex items-center">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                />
               <span className="ml-2 text-sm font-semibold text-gray-700">Is Category not available ?</span>
            </label>
        </div>
        {
            isChecked===true &&
            <div>
                 <InputField
                label="Category Name"
                name="ategoryName"
                type="string"
                placeholder="Enter category Name for the Mentor"
                register={register}
                />
                 <InputField
                label="Category Image"
                name="categoryImg"
                type="string"
                placeholder="Enter category Image link"
                register={register}
                />
                 <InputField
                label="Category Index"
                name="categoryIndex"
                type="string"
                placeholder="Enter category id for the category"
                register={register}
                />
            </div>
        }
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
         {
            isLoading ? <span className="">Adding.. </span> : <span>Add Mentor</span>
          }
        </button>
      </form>
    </div>
  )
}

export default AddMentor