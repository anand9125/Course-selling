import CoursesCardComponent from "../../componets/CoursesCard"
import { IoLocationOutline } from "react-icons/io5";
function OurlatestCourses() {
  return (
    <div>
        <div  className="sm:pl-3">
              <div className="max-w-7xl mx-auto ">
                <div className=' font-semibold p-5  text-2xl md:text-center'>
                    Our Latest Courses
                </div>
                 <div>
                 {/* <CoursesCardComponent /> */}
                </div>
               <div className="text-center p-5">
                 <button className="bg-primary text-white px-6 py-3 rounded-lg transform hover:scale-105 hover:opacity-90 hover:shadow-xl transition-all duration-300 ease-in-out">
                    Browse Courses
                 </button>
               </div>
            </div>
            <div className="w-full h-px bg-slate-200"></div>

        </div>
        <div className=" max-w-7xl mx-auto sm:pl-3">
            <div className="md:flex justify-between">
            <div className="pt-6">
                <div className="flex items-center space-x-4">
                  <IoLocationOutline className="text-xl text-gray-600 w-8 h-6" />
                  <div className="flex flex-col  ">
                    <span className="font-semibold  text-gray-800">People Trust Us</span>
                    <span className="text-sm text-gray-600">Sold over 3000 Courses</span>
                   </div>
                </div>
            </div>
            <div className="pt-6">
                <div className="flex items-center space-x-4">
                  <IoLocationOutline className="text-xl text-gray-600 w-8 h-6" />
                  <div className="flex flex-col  ">
                    <span className="font-semibold  text-gray-800">We Care</span>
                    <span className="text-sm text-gray-600">About you and your Success</span>
                   </div>
                </div>
            </div>
            <div className="pt-6">
                <div className="flex items-center space-x-4">
                  <IoLocationOutline className="text-xl text-gray-600 w-8 h-6" />
                  <div className="flex flex-col  ">
                    <span className="font-semibold  text-gray-800">Instant Access</span>
                    <span className="text-sm text-gray-600">To your purchased Content</span>
                   </div>
                </div>
            </div>
            <div className="pt-6">
                <div className="flex items-center space-x-4">
                  <IoLocationOutline className="text-xl text-gray-600 w-8 h-6" />
                  <div className="flex flex-col  ">
                    <span className="font-semibold  text-gray-800">100% Secure Checkout</span>
                    <span className="text-sm text-gray-600">UPI / Crypto / Paypal</span>
                   </div>
                </div>
            </div>
         </div>
        </div>
    </div>
  )
}

export default OurlatestCourses