import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MentorsCard from '../../componets/MentorsCard'
import { useMentorStore } from '../../store/useMentorStore'


function CategoryMentors() {
    const { categoryId } = useParams<{ categoryId: string}>()
    const {mentors,fetchMentors} = useMentorStore()
    
    useEffect(() => {
        fetchMentors( categoryId!);
    }, []);

  console.log(categoryId)
  console.log(mentors)
  return (
    <div>
        <div className='max-w-5xl  ml-auto'>
            <div>
                <div className='text-3xl font-semibold pt-3 md:text-4xl'>
                    Mentors
                </div>
                <div>
                  <MentorsCard mentors ={mentors}  categoryId ={ categoryId }></MentorsCard>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CategoryMentors