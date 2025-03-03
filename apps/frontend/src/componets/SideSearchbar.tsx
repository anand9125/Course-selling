import { IoIosSearch } from "react-icons/io";
import { useCategoryStore } from "../store/useCategoryStore";
import { useMentorStore } from "../store/useMentorStore";
import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { sideSearchQuery } from "../store/Searchbar/atom";
import { allCoursesWithMetadata } from "../store/CourseMetaData/atom";
import CourseList from "./CourseList";

function SideSearchbar() {
  const categories = useCategoryStore((state) => state.categories);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);

  const allMentors = useMentorStore((state) => state.allMentors);
  const fetchAllMentors = useMentorStore((state) => state.fetchAllMentors);
  const fetchCategory = useMentorStore((state) => state.fetchCateogryByMentorId);

  const [searchQuery, setSearchQuery] = useRecoilState(sideSearchQuery);
  const allCourses = useRecoilValue(allCoursesWithMetadata);

  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCategories();
    fetchAllMentors();
  }, []);

  const handleCategoryClick = useCallback((categoryId: string) => {
    navigate(`/category/${categoryId}`);
  }, [navigate]);

  const handleMentorClick = useCallback(async (mentorId: string) => {
    await fetchCategory(mentorId);
    const updatedCategory = useMentorStore.getState().getCategory;
    
    if (updatedCategory?.categoryId) {
      navigate(`/mentors/${updatedCategory.categoryId}/${mentorId}`);
    } else {
      console.error("Category not found for mentor:", mentorId);
    }
  }, [navigate]);

  const handleCourseClick = useCallback((courseId: string) => {
    navigate(`/courses/${courseId}`);
  }, [navigate]);

  // Filter courses based on search input
  const filteredCourses = searchQuery
    ? allCourses.filter((course) => {
        const query = searchQuery.toLowerCase();
        return (
          course.title.toLowerCase().includes(query) ||
          course.mentor.name.toLowerCase().includes(query) ||
          course.category.name.toLowerCase().includes(query)
        );
      })
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchQuery(""); // Close dropdown
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSearchQuery]);

  return (
    <div className="w-full max-w-60 bg-white p-4 rounded-lg">
      {/* Search Bar */}
      <div className="relative w-full" ref={searchRef}>
        <IoIosSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-300 
          focus:ring-2 focus:ring-gray-600 focus:outline-none transition-shadow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Search Results Dropdown */}
        {searchQuery && filteredCourses.length > 0 && (
          <div className="absolute left-0 top-full w-full flex justify-center z-50">
            <div className="bg-white shadow-lg rounded-md max-w-3xl w-full p-2 max-h-60 overflow-auto">
              <CourseList onCourseClick={handleCourseClick} />
            </div>
          </div>
        )}
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
