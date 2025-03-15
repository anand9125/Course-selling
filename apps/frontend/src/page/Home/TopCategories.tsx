import { useEffect } from "react";
import CategoryCardComponent from "../../componets/CategoryCard"
import { useCategoryStore } from "../../store/useCategoryStore";
import FancyLoader from "../../componets/Skeleton/loderSkelton";


function Topcategories() {
  const { categories, fetchCategories,loading} = useCategoryStore();
  
  useEffect(() => {
    fetchCategories();
  }, []);
  if(loading){
    return <div>
      <FancyLoader></FancyLoader>
    </div>
  }
  
  return (
    <div>
        <div>
            <div className="max-w-7xl mx-auto sm:pl-3">
                <div className=' font-semibold p-5  text-2xl md:text-center'>
                    Top Categories & their Mentor
                </div>
                <div className="flex justify-end pr-4">
                  <a
                    href="/home/categories"
                    className="text-gray-700 hover:text-yellow-600 font-medium transition-all duration-300 ">
                    Show all categories 
                  </a>
                </div>
               
                <CategoryCardComponent categories={categories}></CategoryCardComponent>
            </div>
        </div>
    </div>
  )
}

export default Topcategories