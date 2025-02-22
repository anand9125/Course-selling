import { useNavigate } from 'react-router-dom';
import aditi   from "../assets/aditi.jpg"
function SideSection() {
    const navigate= useNavigate()
  return (
    
    <div className="flex flex-col gap-4 items-start  pt-10">
        {/* Dshboard section */}
        <div 
            className="flex items-center flex-col gap-4 cursor-pointer p-3 rounded-lg transition-all duration-300 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700"
            onClick={() => navigate("/dashboard")}
            tabIndex={0} 
            >
        <img 
        src={aditi}
            alt="Dashboard" 
            className="w-12 h-12 drop-shadow-md"
        />
        <h2 className="text-lg font-semibold text-gray-500">Dashboard</h2>
        </div>

    {/* Category Section */}
    <div 
        className="flex items-center pl-5 pr-4 flex-col gap-4 cursor-pointer p-3 rounded-lg  transition-all duration-300  hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700"
        onClick={() => navigate("/dashboard/add-category")}
        tabIndex={0} 
    >
        <img 
            src="https://www.shutterstock.com/image-vector/category-icon-flat-illustration-vector-600nw-2431883211.jpg" 
            alt="Category-icons" 
            className="w-12 h-12 drop-shadow-md "
        />
        <h2 className="text-lg font-semibold text-gray-500">Category</h2>
    </div>
    {/* Mentors Section */}
    <div 
        className="flex items-center pl-7  pr-4 flex-col gap-4 cursor-pointer p-3 rounded-lg  transition-all duration-300  hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700"
        onClick={() => navigate("/dashboard/add-mentor")}
        tabIndex={0} 
    >
        <img 
            src="https://cdn-icons-png.freepik.com/512/1430/1430954.png" 
            alt="Mentors" 
            className="w-12 h-12 drop-shadow-md"
        />
        <h2 className="text-lg font-semibold text-gray-500">Mentors</h2>
    </div>
    {/* Course Section */}
    <div 
        className="flex items-center pl-8  pr-6 flex-col gap-4 cursor-pointer p-3 rounded-lg  transition-all duration-300  hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700"
        onClick={() => navigate("/dashboard/add-courses")}
        tabIndex={0} 
    >
        <img 
            src="https://cdn-icons-png.flaticon.com/512/4762/4762311.png" 
            alt="Course" 
            className="w-12 h-12 drop-shadow-md"
        />
        <h2 className="text-lg font-semibold text-gray-500">Course</h2>
    </div>
    
    
    
    
</div>
  )
}

export default SideSection