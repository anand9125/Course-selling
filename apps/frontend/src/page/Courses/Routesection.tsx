import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCoursesStore } from '../../store/useCoursesStore'
import { useParams } from 'react-router-dom'
import { useMentorStore } from '../../store/useMentorStore'

function Routesection() {
  const{fetchMentorById,mentor}= useCoursesStore()
  const{category,getCategoryByCategoryId} = useMentorStore()
  
  const {  mentorId,categoryId } = useParams<{ categoryId: string; mentorId?: string }>();
  const navigate= useNavigate()
  useEffect(()=>{
    fetchMentorById(mentorId!)
    getCategoryByCategoryId(categoryId!)
  },[ mentorId,categoryId])
  return (
    <div>
      <div className='flex space-x-2  pt-2'>
            <div className=' hover:scale-110 hover:underline underline-offset-6 cursor-pointer' 
            onClick={()=>{navigate("/")}}> 
                Home
            </div>
            <div>
              /
            </div>
            <div className='hover:scale-110 hover:underline underline-offset-6 cursor-pointer'
            onClick={()=>{navigate(-1)}}>
                 {category?.name}
            </div>
            <div  className='text-slate-400'>
              /
            </div>
            <div className='text-slate-400' >
            {mentor?.name}
            </div>
        </div>
    </div>
  )
}

export default Routesection