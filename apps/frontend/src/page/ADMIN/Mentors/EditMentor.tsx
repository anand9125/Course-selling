
import SideSection from '../../../AdminComponents/SideSection'
import DashboardLayout from '../../../AdminComponents/DashboardLayout'
import MentorLayout from './MentorLayOut'
import { useParams } from 'react-router-dom'
import { InputField, UpdateInputField } from '../../../AdminComponents/InputField'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { adminEndPoint } from '../../../utils/config'
import toast from 'react-hot-toast'
import { useMentorStore } from '../../../store/useMentorStore'


function EditMentor() {
  const{fetchMentorById,mentor} = useMentorStore()
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const[isLoading,setIsLoading]=useState('true')

  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const{ mentorId }= useParams() as any

  useEffect(()=>{
    fetchMentorById(mentorId)
  },[])
  


  const onSubmit = async (data:any) => {
    data.index= Number(data.index)
    console.log(data)
 
    try{
      const response= await axios.put(`${adminEndPoint}/mentor/update/${mentorId}`,data,{
        headers:{
          "Authorization":token,
          "Content-Type":"application/json"
        }
      })
      
      
      if(response.status==200){

        toast.success("Mentor updated successfully")
      }
    }catch(error:any){
     toast.error("Failed to update Mentor",error)
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
                         <MentorLayout></MentorLayout>
                        <div className='pb-6 '>
                          <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Mentor</h2>
                                        
                                <form onSubmit={handleSubmit(onSubmit)} className=''>                                
                                  <UpdateInputField
                                    label="Mentor Name"
                                    name="name"
                                    type="string"
                                    value={mentor?.name}
                                    placeholder="Enter Mentor Name"
                                    register={register}
                                  />                         
                                  <UpdateInputField
                                    label="Index"
                                    name="index"
                                    value={mentor?.index}
                                    placeholder="Enter Categregory Index"
                                    type="number"
                                    register={register}
                          
                                  />    
                                  <UpdateInputField
                                    label="Image Link"
                                    name="image"
                                    type="string"
                                    value={mentor?.image}
                                    placeholder="Enter image link for this Mentor"
                                    register={register}
                                   
                                  />
                                  <UpdateInputField
                                    label="Mentor Id"
                                    name="mentorId"
                                    type="string"
                                    value={mentor?.mentorId}
                                    placeholder="Enter MentorId for this Mentor"
                                    register={register}
                                    
                                  />
                                  <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
                                   {
                                      isLoading ? <span className="">Updating Mentor... </span> : <span>Update Mentor</span>
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

export default EditMentor