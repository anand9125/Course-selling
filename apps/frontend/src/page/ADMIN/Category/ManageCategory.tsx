import React, { useEffect } from 'react'
import DashboardLayout from '../../../AdminComponents/DashboardLayout'
import SideSection from '../../../AdminComponents/SideSection'
import Layout from './Layout'
import { useCategoryStore } from '../../../store/useCategoryStore'
import { Link } from 'react-router-dom'
function ManageCategory() {
 
    const {categories, fetchCategories,deleteCateogry,loading} = useCategoryStore()
   

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDeleteCategory = async (id:any) => {
       await deleteCateogry(id);
        fetchCategories();
      };
      
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
                        <div className='bg-gray-200 w-full '>
                      <Layout></Layout>
                      {/* table layout for displaying a list of books */}
                      <section className="py-1 bg-blueGray-50">
                        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                                <div className="rounded-t mb-0 px-4 py-3 border-0">
                                    <div className="flex flex-wrap items-center">
                                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                            <h3 className="font-semibold text-base text-blueGray-700">All Category</h3>
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
                                                    category Id
                                                </th>
                                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            
                                            {
                                                categories && categories.map((category, index) => (
                                                    <tr key={index}>
                                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                    {index + 1}
                                                    </th>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                        {category.name}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {category.index}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                                                        {category.categoryId}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-4">

                                                        <Link to={`/dashboard/edit-category/${category.categoryId}`} className="font-medium text-indigo-600 hover:text-indigo-700 mr-2 hover:underline underline-offset-2">
                                                            Edit
                                                        </Link>
                                                        <button 
                                                        onClick={() => handleDeleteCategory(category.categoryId)}
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
  )
}

export default ManageCategory



// 2. <tbody> (Table Body)
// Holds the dynamic book data.
// Iterates over books (array of book objects).
// Uses <tr> (table rows) and <td> (table data cells) to display book details.

{/* <tr key={index}> → Creates a new row for each book.
index + 1 → Displays a serial number. */}