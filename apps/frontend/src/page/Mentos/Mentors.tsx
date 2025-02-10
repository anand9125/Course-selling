import React from 'react'
import  RouteSection from "./RouteSection"
import CategoryMentors from './CategoryMentors'

function Mentors() {
  return (
    <div className='max-w-7xl mx-auto sm:pl-1 md:pl-5'>
      <div className='px-4'>
       <RouteSection></RouteSection> 
       <div className='mx-w-4xl mx-auto'>
          <CategoryMentors></CategoryMentors>
       </div>
       

       </div>
    </div>
  )
}

export default Mentors