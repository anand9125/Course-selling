import { useEffect, useRef, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { FaUser } from "react-icons/fa6";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { IoWallet } from "react-icons/io5";
import { MdCurrencyRupee } from "react-icons/md";
import avatarImg from "../assets/avatar.png";
import aditi   from "../assets/aditi.jpg"
import aditi2 from "../assets/aditi (2).jpg"
import { useRecoilState, useRecoilValue } from "recoil";
import { searchQueryState } from "../store/Searchbar/atom";
import { allCoursesWithMetadata } from "../store/CourseMetaData/atom";
import CourseList from "./CourseList"; // Import the CourseList component
import { useNavigate } from "react-router-dom";


function Navbar() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const allCourses = useRecoilValue(allCoursesWithMetadata);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
   const searchRef = useRef(null);
   const navigate = useNavigate()

  // Update screen size dynamically
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter courses based on search input
  const filteredCourses = allCourses.filter((course) => {
    const query = searchQuery.toLowerCase();
    return (
      course.title.toLowerCase().includes(query) ||
      course.mentor.name.toLowerCase().includes(query) ||
      course.category.name.toLowerCase().includes(query)
    );
  });

  function handleLogOut() {
    // Logout logic here
  }
    // Close dropdown when clicking outside
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        // @ts-ignore
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setSearchQuery(""); // Close dropdown
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

  return (
    <header className="bg-white pt-4 w-full relative">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Section - Logo/Menu */}
        {/* <button aria-label="Menu" className="lg:pr-1">
          <FiMenu className="text-2xl text-gray-700 hover:text-gray-900 transition" />
        </button> */}

        {/* Navbar visible only on large screens */}
      
          <div className="flex items-center pl-8 ">
            <a href="/" className="text-xl font-semibold text-gray-800">
             <img src={aditi} alt="aditi.png"  className="w-30 h-20"/>
            </a>
          </div>
      

        {/* Center Section - Search Bar */}
        <div className="flex-1  relative" ref={searchRef}>
          <div className="relative mx-auto w-full px-4 md:px-0 max-w-[52rem] ">
            <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search courses, mentors..."
              className="w-full p-3 pl-9 rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-[#333333] focus:outline-none transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Search Results Dropdown */}
          {searchQuery && filteredCourses.length > 0 && (
            <div className="absolute top-14 left-0 w-full flex justify-center z-50">
            <div className="bg-white shadow-lg rounded-md max-w-[52rem] w-full p-2 max-h-96 overflow-auto">
          
              <CourseList /> {/* Render CourseList when searching */}
            </div>
            </div>
          )}
        </div>

        {/* Right Section - User Profile, Favorites, Cart */}
        <div className="flex items-center gap-6">
          {/* User Profile */}
            <button onClick={() => navigate("/user-Profile")} aria-label="User Menu">
                <img
                  src={avatarImg}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full ring-2 ring-blue-500"
                />
              </button>

          {/* Favorite Button - Visible only on larger screens */}
          {!isMobile && (
            <button className="text-gray-600 hover:text-gray-900">
              <CiHeart className="text-2xl" />
            </button>
          )}

          {/* Wallet - Visible only on mobile */}
          {isMobile && (
            <button
            onClick={() => navigate("/user-Wallet")}
             className="flex justify-between items-center bg-gray-200 p-2 rounded-md z-40">
              <MdCurrencyRupee className="text-lg" />
              <span className="pr-1">0</span>
              <IoWallet />
            </button>
          )}

          {/* Cart Button - Visible only on large screens */}
          {!isMobile && (
            <a href="/cart" className="bg-indigo-600 text-white px-3 md:px-5 py-2 rounded-full flex items-center gap-2  hover:scale-105 hover:opacity-90 hover:shadow-xl transition-all duration-300 ease-in-out">
              <FiShoppingCart className="text-lg" />
              <span className="text-sm">{cartItems.length || 0}</span>
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
