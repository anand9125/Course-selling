import SideSection from '../../../AdminComponents/SideSection'
import DashboardLayout from '../../../AdminComponents/DashboardLayout'
import CoursesLayout from './CoursesLayout'
import AddCourse from './AddCourse'

function AdminCourses() {
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
                                <AddCourse></AddCourse>

                                </div> 
                               </div>
                             </div>
                        </div>
                    </div>       
                </div>
            </div>
  )
}

export default AdminCourses