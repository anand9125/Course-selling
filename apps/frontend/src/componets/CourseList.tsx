import { useRecoilValue } from "recoil";
import { searchQueryState } from "../store/Searchbar/atom";
import { allCoursesWithMetadata } from "../store/CourseMetaData/atom";

const CourseList = () => {
  const searchQuery = useRecoilValue(searchQueryState);
  const allCourses = useRecoilValue(allCoursesWithMetadata);

  const filteredCourses = allCourses.filter((course) => {
    const query = searchQuery.toLowerCase();
    return (
      course.title.toLowerCase().includes(query) ||
      course.mentor.name.toLowerCase().includes(query) ||
      course.category.name.toLowerCase().includes(query)
    );
  });

  return (
  <div className="flex justify-center items-center">
   <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-3xl w-full z-50">


      {filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <div key={course.id} className="flex items-center gap-4 p-3 border-b border-gray-300 last:border-b-0">
            <img 
              src={course.image} 
              alt={course.title} 
              className="h-14 w-14 object-cover rounded-md"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
              <p className="text-sm text-gray-600">Mentor: <span className="font-medium">{course.mentor.name}</span></p>
              <p className="text-sm text-gray-600">Category: <span className="font-medium">{course.category.name}</span></p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center py-4">No courses found.</p>
      )}
     </div>
    </div>
  );
};

export default CourseList;
