import {useEffect} from 'react'
import DashboardLayout from '../../../AdminComponents/DashboardLayout'
import SideSection from '../../../AdminComponents/SideSection'
import Layout from './Layout'
import { useParams } from 'react-router-dom'
import { UpdateInputField} from '../../../AdminComponents/InputField'
import { useForm } from 'react-hook-form'
import { adminEndPoint } from '../../../config'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useCategoryStore } from '../../../store/useCategoryStore'
 
function EditCategory() {
    const {singleCateogry,fetchSingleCategory} = useCategoryStore()
    const {categoryId} = useParams() as any
    const { register, handleSubmit } = useForm();
    // const[isLoading,setIsLoading]=useState('falae')
    const token = JSON.parse(localStorage.getItem("token") || "{}");
    

     useEffect(() =>{
        fetchSingleCategory(categoryId)
    }, []);

    
    const onSubmit = async (data:any) => {
    data.index= Number(data.index)
  
    try{
      const response= await axios.put(`${adminEndPoint}/category/update/${categoryId}`,data,{
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
                              <div className=' bg-gray-800'>
                                  <SideSection></SideSection>
                              </div>
                              <div className='w-full'>
                                   <div>
                                    <DashboardLayout></DashboardLayout>
                                    </div>
                                    <div className='bg-gray-200 w-full pb-7 '>
                                  <Layout></Layout>
                                  <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Category</h2>

                                    
                                    <form onSubmit={handleSubmit(onSubmit)} className=''>
                                    
                                        < UpdateInputField
                                        label="Category Name"
                                        name="name"
                                        type="string"
                                        value={singleCateogry?.name|| ""}
                                        placeholder="Enter Category Name"
                                        register={register}
                                        />

                                        < UpdateInputField
                                        label="Index"
                                        name="index"
                                        placeholder="Enter Categregory Index"
                                        value={singleCateogry?.index|| ""}
                                        type="number"
                                        register={register}

                                        />

                                        < UpdateInputField
                                        label="Image Link"
                                        name="image"
                                        type="string"
                                        value={singleCateogry?.image|| ""}
                                        placeholder="Enter image link for this category"
                                        register={register}
                                        
                                        />

                                        {/* New Price */}
                                        < UpdateInputField
                                        label="Category Id"
                                        name="categoryId"
                                        type="string"
                                        value={singleCateogry?.categoryId|| ""}
                                        placeholder="Enter category id for this category"
                                        register={register}
                                        
                                        />
                                        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
                                      <span>Update Category</span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                         </div>
                       </div>
                    </div>       
                  </div>
               </div>
    
  )
}

export default EditCategory