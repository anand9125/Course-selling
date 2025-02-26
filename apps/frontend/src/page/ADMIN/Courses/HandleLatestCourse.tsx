import SideSection from '../../../AdminComponents/SideSection'
import DashboardLayout from '../../../AdminComponents/DashboardLayout'
import CoursesLayout from './CoursesLayout'
import { useForm } from 'react-hook-form';
import { InputField } from '../../../AdminComponents/InputField';

import { useMentorStore } from '../../../store/useMentorStore';

function HandleLatestCourse() {
     const { register, handleSubmit } = useForm();
 
     const{putLatestCourseMentorId} = useMentorStore()

     
     const onSubmit = async (data:any) => {
        console.log(data)
      await putLatestCourseMentorId(data)
     }
  return (
    <div>
            <div className='max-w-7xl mx-auto pl-8'>
                <div className="flex w-full pb-4">
                    <div className="w-full bg-white   shadow-xl flex">
                        {/* sidebar section */}
                            <div className=' bg-gray-800 '>
                                <SideSection></SideSection>
                            </div>
                            <div className='w-full'>
                            <div>
                                <DashboardLayout></DashboardLayout>
                            </div>
                            <div className='bg-gray-200 w-full '>
                                <CoursesLayout></CoursesLayout>
                            <div className='pb-14 '>
                            <div className="max-w-lg   mx-auto md:p-9 p-3 bg-white rounded-lg shadow-md">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Set Latest Courses By Mentor Id</h2>

                                <form onSubmit={handleSubmit(onSubmit)} className=''>
                                            
                                    <InputField
                                    label="Mentor Id"
                                    name="mentorId"
                                    type="string"
                                    placeholder="Enter Mentor Id of latest Courses"
                                    register={register}
                                    />
                                <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
                                
                                    <span>Set Latest Course</span>
                                
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

export default HandleLatestCourse