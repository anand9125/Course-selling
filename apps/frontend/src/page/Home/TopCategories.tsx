import { useEffect } from "react";
import CategoryCardComponent from "../../componets/CategoryCard"
import { useCategoryStore } from "../../store/useCoursesStore";

function Topcategories() {
  const { categories, fetchCategories } = useCategoryStore();
  
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
        <div>
            <div className="max-w-7xl mx-auto sm:pl-3">
                <div className=' font-semibold p-5  text-2xl md:text-center'>
                    Top Categories & their Mentor
                </div>
                <CategoryCardComponent categories={categories}></CategoryCardComponent>
            </div>
        </div>
    </div>
  )
}

export default Topcategories