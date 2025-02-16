
import { useNavigate } from 'react-router-dom'



function CategoryRoute() {

    const navigate= useNavigate()

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
               Categories
            </div>
        </div>
        
    </div>
  )
}

export default CategoryRoute