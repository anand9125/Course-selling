
import CategoryRoute from './CategoryRoute'
import AllCategory from './AllCategory'
function Category() {
  return (
    <div className='max-w-7xl mx-auto sm:pl-1 '>
      <div className='px-4 '>
        <div className=' md:pl-4'>
          <CategoryRoute></CategoryRoute> 
        </div> 
        <div className=''>
          <AllCategory></AllCategory>
        </div>
       </div>
    </div>
  )
}

export default Category