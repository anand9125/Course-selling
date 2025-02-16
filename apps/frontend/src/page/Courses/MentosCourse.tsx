import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCoursesStore } from '../../store/useCoursesStore'
import CoursesCard from '../../componets/CoursesCard';
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
        <div>
            <div className='max-w-5xl  ml-auto'>
                <div>
                    
                    <div>
                    < CoursesCard  courses ={courses}  mentor={mentor}></ CoursesCard>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default MentosCourse