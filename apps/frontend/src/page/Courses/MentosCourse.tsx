import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCoursesStore } from '../../store/useCoursesStore'
import CoursesCard from '../../componets/CoursesCard';
import SideSearchbar from '../../componets/SideSearchbar';
function MentosCourse() {
    const { categoryId, mentorId } = useParams<{ categoryId: string; mentorId?: string }>();


    const {courses,fetchCourses,mentor,fetchMentorById} = useCoursesStore()
    
    useEffect(() => {
      if (!categoryId || !mentorId) return; // Avoid unnecessary API calls
    
      fetchCourses(categoryId, mentorId);
      fetchMentorById(mentorId);
    }, [categoryId, mentorId, fetchCourses, fetchMentorById]); // Add functions as dependencies if they are not stable
    
    console.log(mentor)
  return (
      <div className="flex">
     
        <div className="hidden pr-12 pt-4 lg:block w-1/4 ">
          <SideSearchbar />
        </div>
        <div className="w-full lg:w-3/4">
          <div className="text-3xl font-semibold pt-3 md:text-4xl">Mentors</div>
          < CoursesCard  courses ={courses}  mentor={mentor}></ CoursesCard>
        </div>
      </div>
  )
}

export default MentosCourse