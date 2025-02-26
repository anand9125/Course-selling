import SideSection from '../../../AdminComponents/SideSection'
import DashboardLayout from '../../../AdminComponents/DashboardLayout'
import MentorLayout from './MentorLayOut'
import { useMentorStore } from '../../../store/useMentorStore'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function ManageMentor() {
    const{ allMentors,fetchAllMentors,deleteMentor} = useMentorStore()
    console.log(allMentors)
    useEffect(()=>{
        fetchAllMentors()
    },[])
    const handleDeleteMentor = async (id:any) => {
        await deleteMentor(id);
         fetchAllMentors();
       };
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
         {/* table layout for displaying a list of books */}
         <section className="py-1 bg-blueGray-50">
                        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                                <div className="rounded-t mb-0 px-4 py-3 border-0">
                                    <div className="flex flex-wrap items-center">
                                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                            <h3 className="font-semibold text-base text-blueGray-700">All Mentors</h3>
                                        </div>
                                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                            <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                                        </div>
                                    </div>
                                </div>
                                  
                                <div className="block w-full overflow-x-auto">
                                    <table className="items-center bg-transparent w-full border-collapse ">
                                    {/* Defines the header row of the table. */}
                                        <thead>
                                            <tr>
                                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                    #
                                                </th>
                                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                   name
                                                </th>
                                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                    index
                                                </th>
                                               
                                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                    Menotr Id
                                                </th>
                                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                    Category Id
                                                </th>
                                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            
                                            {
                                                allMentors && allMentors.map((mentor, index) => (
                                                    <tr key={index}>
                                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                    {index + 1}
                                                    </th>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                        {mentor.name}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {mentor.index}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                                                        {mentor.mentorId}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                                                        {mentor.category.categoryId}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-4">

                                                        <Link to={`/dashboard/edit-mentor/${mentor.mentorId}`} className="font-medium text-indigo-600 hover:text-indigo-700 mr-2 hover:underline underline-offset-2">
                                                            Edit
                                                        </Link>
                                                        <button 
                                                        onClick={() => handleDeleteMentor(mentor.mentorId)}
                                                        className="font-medium bg-red-500 py-1 px-4 rounded-full text-white mr-2">Delete</button>
                                                    </td>
                                                </tr> 
                                                ))
                                            }
                            

                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>

                    </section>
        </div> 
      </div>
    </div>
  </div>
</div>       
</div>
</div>
  )
}

export default ManageMentor