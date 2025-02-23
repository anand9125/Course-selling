import React, { useEffect, useState } from 'react'
import SideSection from '../../../AdminComponents/SideSection'
import DashboardLayout from '../../../AdminComponents/DashboardLayout'
import CoursesLayout from './CoursesLayout'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { adminEndPoint } from '../../../utils/config';
import toast from 'react-hot-toast';
import { UpdateInputField } from '../../../AdminComponents/InputField';
import { useParams } from 'react-router-dom';
import { useCoursesStore } from '../../../store/useCoursesStore';

function EditCourse() {
  const{courseId} = useParams() as any
  const{singleCourse,fetchSingleCourse} = useCoursesStore()
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const[isLoading,setIsLoading]=useState('true')
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  
  useEffect(()=>{
   fetchSingleCourse(courseId)
  },[])
  const onSubmit = async (data:any) => {
      data.index= Number(data.index)
      data.price = Number(data.price)
      data.actualPrice = Number(data.actualPrice)
      console.log(data)


      try{
        const response= await axios.put(`${adminEndPoint}/courses/update/${courseId}`,data,{
          headers:{
            "Authorization":token,
            "Content-Type":"application/json"
          }
        })
        if(response.status==200){
          toast.success("Category update successfully")
        }
      }catch(error:any){
       toast.error("Failed to update category",error)
      }
  }

 
  return (
          <div>
            <div className='max-w-7xl mx-auto pl-8'>
                <div className="flex bg-gray-100 min-h-screen ">
                    <div className="w-full bg-white  shadow-xl flex">
                        {/* sidebar section */}
                            <div className=' bg-gray-800'>
                                <SideSection></SideSection>
                            </div>
                            <div className='w-full'>
                            <div>
                                <DashboardLayout></DashboardLayout>
                            </div>
                            <div className='bg-gray-200 w-full '>
                                <CoursesLayout></CoursesLayout>
                            <div className='pb-6 '>
                              <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Course</h2>
                             
                                     
                                         <form onSubmit={handleSubmit(onSubmit)} className=''>
                                         
                                             <UpdateInputField
                                             label="Title"
                                             name="title"
                                             type="string"
                                             value={singleCourse?.title}
                                             placeholder="Enter title of the course"
                                             register={register}
                                             />
                                             <UpdateInputField
                                             label=" Description"
                                             name="description"
                                             value={singleCourse?.description}
                                             type="string"
                                             placeholder="Enter description of the course"
                                             register={register}
                                             />
                                             <UpdateInputField
                                             label="Price"
                                             name="price"
                                             value={singleCourse?.price}
                                             type="number"
                                             placeholder="Enter price of the course"
                                             register={register}
                                             />
                                             <UpdateInputField
                                             label="Actual Price"
                                             name="actualPrice"
                                             type="number"
                                             value={singleCourse?.actualPrice}
                                             placeholder="Enter actual price of the course"
                                             register={register}
                                             />
                             
                                             <UpdateInputField
                                             label="Index"
                                             name="index"
                                             value={singleCourse?.index}
                                             placeholder="Enter Course Index"
                                             type="number"
                                             register={register}
                             
                                             />
                             
                                             <UpdateInputField
                                             label="Image Link"
                                             name="image"
                                             type="string"
                                             value={singleCourse?.image}
                                             placeholder="Enter Course image url"
                                             register={register}
                                             
                                             />
                                             <UpdateInputField
                                             label="Course Id"
                                             name="courseId"
                                             type="string"
                                             value={singleCourse?.courseId}
                                             placeholder="Enter course id for this Course"
                                             register={register}
                                             
                                             />
                             
                                             <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
                                             {
                                                 isLoading ? <span className="">Updating... </span> : <span>Update Course</span>
                                             }
                                             </button>
                                         </form>
                                     </div>
                            </div> 
                          </div>
                        </div>
                    </div>
                </div>       
            </div>
        </div>
  )
}

export default EditCourse