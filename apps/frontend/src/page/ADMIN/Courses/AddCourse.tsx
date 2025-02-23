import  { useState } from 'react'
import {InputField} from '../../../AdminComponents/InputField';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { adminEndPoint } from '../../../utils/config';
import toast from 'react-hot-toast';

const AddCourse = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const[isLoading,setIsLoading]=useState('true')
    const [isCheckedCat, setIsChecked] = useState(false);
    const [isCheckedMen, setIsCheckedMen] = useState(false);
    const token = JSON.parse(localStorage.getItem("token") || "{}");
    
    
    const onSubmit = async (data:any) => {
        data.index= Number(data.index)
        data.price = Number(data.price)
        data.actualPrice = Number(data.actualPrice)
        data.categoryIndex = Number(data.categoryIndex)
        data.mentorIndex = Number(data.mentorIndex)
        console.log(data)
 
        try{
          const response= await axios.post(`${adminEndPoint}/courses/create`,data,{
            headers:{
              "Authorization":token,
              "Content-Type":"application/json"
            }
          })
          if(response.status==201){
            setIsLoading("false")
            toast.success("Course created successfully")
          }
        }
        catch(error:any){
         toast.error("Failed to create Course",error)
        }
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    const handleMenCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsCheckedMen(event.target.checked);
    };


    
    return (
        <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
           <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Course</h2>

        
            <form onSubmit={handleSubmit(onSubmit)} className=''>
            
                <InputField
                label="Title"
                name="title"
                type="string"
                placeholder="Enter title of the course"
                register={register}
                />
                <InputField
                label=" Description"
                name="description"
                type="string"
                placeholder="Enter description of the course"
                register={register}
                />
                <InputField
                label="Price"
                name="price"
                type="number"
                placeholder="Enter price of the course"
                register={register}
                />
                <InputField
                label="Actual Price"
                name="actualPrice"
                type="number"
                placeholder="Enter actual price of the course"
                register={register}
                />

                <InputField
                label="Index"
                name="index"
                placeholder="Enter Course Index"
                type="number"
                register={register}

                />

                <InputField
                label="Image Link"
                name="image"
                type="string"
                placeholder="Enter Course image url"
                register={register}
                
                />
                <InputField
                label="Course Id"
                name="courseId"
                type="string"
                placeholder="Enter course id for this Course"
                register={register}
                
                />

                <InputField
                label="Category Id"
                name="categoryId"
                type="string"
                placeholder="Enter category id for this Course"
                register={register}
                
                />
                <div className="mb-4">
                    <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        checked={isCheckedCat}
                        onChange={handleCheckboxChange}
                        className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                        />
                    <span className="ml-2 text-sm font-semibold text-gray-700">Is Category not available ?</span>
                    </label>
                </div>
                {
                    isCheckedCat===true &&
                    <div>
                        <InputField
                        label="Category Name"
                        name="categoryName"
                        type="string"
                        placeholder="Enter category Name "
                        register={register}
                        />
                        <InputField
                        label="Category Image"
                        name="categoryImg"
                        type="string"
                        placeholder="Enter category Image url"
                        register={register}
                        />
                        <InputField
                        label="Category Index"
                        name="categoryIndex"
                        type="number"
                        placeholder="Enter category index "
                        register={register}
                        />
                    </div>
                }
                <InputField
                label="Mentor Id"
                name="mentorId"
                type="string"
                placeholder="Enter mentor id for this Course"
                register={register}
                
                />
                <div className="mb-4">
                    <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        checked={isCheckedMen}
                        onChange={handleMenCheckboxChange}
                        className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                        />
                    <span className="ml-2 text-sm font-semibold text-gray-700">Is Mentor not available ?</span>
                    </label>
                </div>
                {
                isCheckedMen==true &&
                <div>
                    <InputField
                        label="Mentor Name"
                        name="mentorName"
                        type="string"
                        placeholder="Enter Mentor Name "
                        register={register}
                        />
                        <InputField
                        label="Mentor Image"
                        name="mentorImage"
                        type="string"
                        placeholder="Enter Mentor Image url "
                        register={register}
                        />
                        <InputField
                        label="Mentor Index"
                        name="mentorIndex"
                        type="number"
                        placeholder="Enter Mentor Index"
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

export default AddCourse