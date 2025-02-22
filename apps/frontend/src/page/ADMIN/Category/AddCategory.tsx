import  { useState } from 'react'
import InputField from '../../../AdminComponents/InputField';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { adminEndPoint } from '../../../utils/config';
import toast from 'react-hot-toast';
import Loading from '../../../AdminComponents/Loading';
const AddCategory = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const[isLoading,setIsLoading]=useState('falae')
    const token = JSON.parse(localStorage.getItem("token") || "{}");
     console.log(token)
    const onSubmit = async (data:any) => {
    data.index= Number(data.index)
 
    try{
      const response= await axios.post(`${adminEndPoint}/category/create-category`,data,{
        headers:{
          "Authorization":token,
          "Content-Type":"application/json"
        }
      })
      if(response.status==200){
        toast.success("Category added successfully")
      }
    }catch(error:any){
     toast.error("Failed to add category",error)
    }
    }
   
  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Category</h2>

     
      <form onSubmit={handleSubmit(onSubmit)} className=''>
       
        <InputField
          label="Category Name"
          name="name"
          type="string"
          placeholder="Enter Category Name"
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
          placeholder="Enter image link for this category"
          register={register}
         
        />

        {/* New Price */}
        <InputField
          label="Category Id"
          name="categoryId"
          type="string"
          placeholder="Enter category id for this category"
          register={register}
          
        />
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
         {
            isLoading ? <span className="">Adding.. </span> : <span>Add Book</span>
          }
        </button>
      </form>
    </div>
  )
}

export default AddCategory 