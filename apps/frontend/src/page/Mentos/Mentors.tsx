
import  RouteSection from "./RouteSection"
import CategoryMentors from './CategoryMentors'


function Mentors() {
  return (
    <div className='max-w-7xl mx-auto sm:pl-1 '>
      <div className='px-4 '>
          <div className=' md:pl-4'>
           <RouteSection></RouteSection> 
          </div> 
          <div className=''>
          <CategoryMentors></CategoryMentors>
        </div>
       </div>
    </div>
  )
}

export default Mentors