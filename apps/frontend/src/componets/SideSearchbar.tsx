import { IoIosSearch } from "react-icons/io";
import { useCategoryStore } from "../store/useCategoryStore";
import { useMentorStore } from "../store/useMentorStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  categoryId: string;
  image: string;
  index: number;
}

interface MentorWithCategory {
  id: string;
  mentorId: string;
  name: string;
  image: string;
  index: number;
  category: Category;
}

function SideSearchbar() {
 // When using Zustand stores like useMentorStore(), you need to provide a selector to extract the required state. 
  const categories = useCategoryStore((state) => state.categories);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);

  const allMentors = useMentorStore((state) => state.allMentors);
  const fetchAllMentors = useMentorStore((state) => state.fetchAllMentors);

  const category = useMentorStore((state) => state.getCategory);
  const fetchCategory = useMentorStore((state) => state.fetchCateogryByMentorId);


  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchAllMentors();
  }, []);


  const handleCategoryClick = (categoryId: string) => {
    console.log(categoryId)
    navigate(`/category/${categoryId}`);
  };

  const handleMentorClick = async (mentorId: string) => {
    await fetchCategory(mentorId); // Fetch category first
    
    // Add a small delay to ensure Zustand state updates properly
    setTimeout(() => {
      const updatedCategory = useMentorStore.getState().getCategory; // Fetch latest state
        if (updatedCategory?.categoryId) {
      window.location.replace(`/mentors/${updatedCategory.categoryId}/${mentorId}`);
    } else {
      console.error("Category not found for mentor:", mentorId);
    }
      console.log(updatedCategory);
    }, 300); // Small timeout to allow state update
  
  };
  

  return (
    <div className="w-full max-w-60 bg-white p-4 rounded-lg ">
      {/* Search Bar */}
      <div className="relative">
        <IoIosSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-300 
         focus:ring-2 focus:ring-gray-600 focus:outline-none transition-shadow"
        />
      </div>

      {/* Categories & Mentors */}
      <div className="pt-4 font-semibold text-lg">Categories & Mentors</div>

      {/* Categories List */}
      <div className="mt-2">
        <div className="font-medium text-gray-600">Categories</div>
        <ul className="mt-1 space-y-1">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <li
                key={cat.id}
                className="text-gray-800 hover:text-yellow-600 cursor-pointer hover:underline underline-offset-2 transition-all duration-200"
                onClick={() => handleCategoryClick(cat.categoryId)}
              >
                {cat.name}
              </li>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No categories available</p>
          )}
        </ul>
      </div>

      {/* Mentors List */}
      <div className="mt-4">
        <div className="font-medium text-gray-600">Mentors</div>
        <ul className="mt-1 space-y-1">
          {allMentors.length > 0 ? (
            allMentors.map((mentor) => (
              <li
                key={mentor.id}
                className="text-gray-800 hover:text-yellow-600 cursor-pointer hover:underline underline-offset-2 transition-all duration-200"
                onClick={() => handleMentorClick(mentor.mentorId)}
              >
                {mentor.name}
              </li>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No mentors available</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SideSearchbar;
