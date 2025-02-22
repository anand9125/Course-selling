import { Outlet } from 'react-router-dom';
import SideSection from '../../../AdminComponents/SideSection';

import { MdIncompleteCircle } from 'react-icons/md'

import DashboardLayout from '../../../AdminComponents/DashboardLayout';
import RevenueChart from './MonthlyRevenu';
function Dashboard() {
  
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

                    <div className='bg-gray-200'>
                        <main className="p-6 sm:p-10 space-y-6 ">
                          <div className=" space-y-6 md:space-y-0 md:flex-row justify-between ">
                            <div className="mr-6 pb-7">
                              <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
                              <h2 className="text-gray-600 ml-0.5"> CourseHub Inventory</h2>
                            </div>
                          <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 ">
                            <div className="flex items-center p-8 bg-white shadow rounded-lg lg:max-w-80  ">
                              <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                               
                              </div>
                              <div>
                                 <span className="block text-2xl font-bold">Total Course</span>
                                 <span className="block text-gray-500">Products</span>
                              </div>
                            </div>
                            <div className="flex items-center p-8 bg-white shadow rounded-lg">
                                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                                    <img src="https://www.shutterstock.com/image-vector/category-icon-flat-illustration-vector-600nw-2431883211.jpg" alt="" />
                                </div>
                                <div>
                                    <span className="block text-2xl font-bold">Total category</span>
                                    <span className="block text-gray-500">Categroy</span>
                                </div>
                            </div>
                            <div className="flex items-center p-8 bg-white shadow rounded-lg">
                            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                </svg>
                            </div>
                            <div>
                                <span className="inline-block text-2xl font-bold">Total Mentors</span>
                                <span className="inline-block text-xl text-gray-500 font-semibold">(13%)</span>
                                <span className="block text-gray-500">Trending</span>
                            </div>
                            </div>
                            <div className="flex items-center p-8 bg-white shadow rounded-lg">
                                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                                <MdIncompleteCircle className='size-6'/>
                                </div>
                                <div>
                                    <span className="block text-2xl font-bold">Total orders</span>
                                    <span className="block text-gray-500">Total Orders</span>
                                </div>
                            </div>
                            <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg ">
                              <div className="px-6 py-5 font-semibold border-b border-gray-100">The number of orders per month</div>
                                <div className="p-4 flex-grow">
                                  <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                                   <RevenueChart />
                                  </div>
                                </div>
                            </div>
                            <div className="flex items-center p-8 bg-white shadow rounded-lg max-w-72 ">
                                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
                                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-2xl font-bold">139</span>
                                    <span className="block text-gray-500">Website visits (last day)</span>
                                </div>
                            </div>
                            
                        </section>
                        
                          </div>
                          <Outlet/>
                        </main>
                    </div>
                    </div>
                    
                </div>
               
            </div>       
          </div>
      </div>
    )
}

export default Dashboard