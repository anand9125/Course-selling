import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCoursesStore } from '../../store/useCoursesStore'
import CoursesCard from '../../componets/CoursesCard';
function MentosCourse() {
    const { categoryId, mentorId } = useParams<{ categoryId: string; mentorId?: string }>();


    const {courses,fetchCourses,mentor,fetchMentorById} = useCoursesStore()
    
  
    useEffect(()=>{
      fetchCourses(categoryId!,mentorId!),
      fetchMentorById(mentorId!)
    },[categoryId, mentorId ])
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