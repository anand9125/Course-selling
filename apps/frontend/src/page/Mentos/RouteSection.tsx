import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMentorStore } from '../../store/useMentorStore'


function RouteSection() {
    const { categoryId } = useParams<{ categoryId: string}>()
    const{getCategoryByCategoryId,category}=useMentorStore()
    const navigate= useNavigate()
    useEffect(()=>{
        getCategoryByCategoryId(categoryId!)
       
     },[categoryId,getCategoryByCategoryId])
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
            <div className='text-slate-400' >
               {category?.name}
            </div>
        </div>
        
    </div>
  )
}

export default RouteSection