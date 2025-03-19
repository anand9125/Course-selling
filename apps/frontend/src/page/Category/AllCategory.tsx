import { useEffect } from 'react'
import SideSearchbar from '../../componets/SideSearchbar';
import AllCategoryCardComponent from '../../componets/AllCategoryCardComponent';
import { useCategoryStore } from "../../store/useCategoryStore";

function AllCategory() {
   const { categories, fetchCategories} = useCategoryStore();
     
    useEffect(() => {
      fetchCategories();
     }, []);
        
   
    return (
      <div className="flex">
       
        <div className="hidden pr-12 pt-4 lg:block w-1/4 ">
          <SideSearchbar />
        </div>
        <div className="w-full lg:w-3/4">
          <div className="text-3xl font-semibold pt-3 md:text-4xl">All Categories</div>
          <AllCategoryCardComponent categories={categories}></AllCategoryCardComponent>
        </div>
      </div>
    );
  }


export default AllCategory