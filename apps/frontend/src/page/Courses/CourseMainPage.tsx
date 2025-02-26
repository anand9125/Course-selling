import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCoursesStore } from "../../store/useCoursesStore";
import aditi from "../../assets/adi.png"
import useCartAction from "../../componets/useCartAction";
interface Courses{
  id: string,
  title:string,
  courseId:string,
  price:number,
  actualPrice:number
  description: string,
  categoryId: string,
  mentorId: string,
  image: string,
  index: number,
  
}

function CourseMainPage() {
  const { addToCart } = useCartAction(); // Get addToCart function
  const { courseId } = useParams<{ courseId: string }>();
  const { fetchSingleCourse, singleCourse } = useCoursesStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSingleCourse(courseId!);
  }, [courseId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
   
      <div className="flex items-center space-x-2 text-gray-600 mb-6">
        <span
          className="hover:text-black cursor-pointer hover:underline"
          onClick={() => navigate("/")}
        >
          Home
        </span>
        <span>/</span>
        <span
          className="hover:text-black cursor-pointer hover:underline"
          onClick={() => navigate(-1)}
        >
          Courses
        </span>
        <span>/</span>
        <span className="text-gray-400">{courseId}</span>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
     
        <div className="flex justify-center ">
        <div className="flex justify-center">
          <div className="relative bg-white rounded-lg  p-4">
            {/* Aditi Image */}
            <img
              src={aditi}
              alt="Aditi"
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-36 object-cover  b  z-10"
            />
            {/* Single Course Image */}
            <img
              src={singleCourse?.image}
              alt={singleCourse?.title}
              className="w-full h-auto object-cover rounded-md mt-24"
            />
          </div>
        </div>

        </div>

       
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-3">{singleCourse?.title}</h1>
          <p className="text-gray-600 mb-4">{singleCourse?.description}</p>

          <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl font-semibold text-green-600">
              ₹{singleCourse?.price}
            </span>
            {singleCourse?.actualPrice && (
              <span className="text-lg text-gray-500 line-through">
                ₹{singleCourse?.actualPrice}
              </span>
            )}
          </div>
          <ul className="list-disc pl-5 text-gray-600 mt-3 pb-4">
            <li>CourseHub link</li>
            <li>Easy to download</li>
            <li>
              Trust issues: <span className="text-blue-500 cursor-pointer">Read Here</span>
            </li>
            <li>
              For Query: <span className="text-blue-500 cursor-pointer">DM me</span>
            </li>
            <li>Check Your Email For The Course Link</li>
          </ul>

          <button className="bg-green-500 w-full  text-white px-6 py-3 rounded-lg transform hover:scale-105 hover:opacity-90 hover:shadow-xl transition-all duration-300 ease-in-out"
           onClick={(e) => {
            e.stopPropagation();
              addToCart(singleCourse!);
            navigate("/cart")
            }}
          >
            Add to Cart
          </button>

          
          <div className="mt-4 font-semibold text-gray-700">
            Instant Delivery, After Payment. You will get the Download Link
            Immediately on Email!
          </div>
          <ul className="list-none space-y-2 mb-6">
            <li className="flex items-center gap-2">✅UPI, Paypal or Cryptocurrency Accepted. </li>
            <li className="flex items-center gap-2">✅Premium Courses Up to 90% OFF </li>
            <li>
             ✅Join us to get Updates:{" "}
              <span className="text-blue-500 cursor-pointer">Social Media</span>
            </li>
           
          </ul>


          
         
          <div className="mt-6 flex justify-center w-full">
            <img
              className="w-full w-full rounded-md "
              decoding="async"
              src="https://i.imgur.com/PdJ2k92.png"
              alt="Payment Methods"
            />
          </div>
        </div>
        
        
      </div>
      
    </div>
  );
}

export default CourseMainPage;
