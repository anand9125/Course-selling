import React, { useEffect } from 'react'
import Routesection from './Routesection'
import { useParams } from 'react-router-dom'
import { useCoursesStore } from '../../store/useCoursesStore'

function Courses() {
  
  const { categoryId, mentorId } = useParams<{ categoryId: string; mentorId?: string }>();
  const {courses,isLoading,fetchCourses} = useCoursesStore()

  useEffect(()=>{
    fetchCourses(categoryId!,mentorId!)
  },[])
  return (
    <div>
         <div className='max-w-7xl mx-auto sm:pl-1 md:pl-5'>
           <div className='px-4'>
            <Routesection ></Routesection>
                
                <div>
 
                </div>
            </div>
        </div>
    </div>
  )
}

export default Courses