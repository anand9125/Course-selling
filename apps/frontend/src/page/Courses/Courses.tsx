import Routesection from './Routesection'

import MentosCourse from './MentosCourse'

function Courses() {
  

  return (
    <div>
         <div className='max-w-7xl mx-auto sm:pl-1 md:pl-5'>
           <div className='px-4'>
            <Routesection ></Routesection>
                
          <div className='mx-w-4xl mx-auto'>
          < MentosCourse/>
          </div>
            </div>
        </div>
    </div>
  )
}

export default Courses