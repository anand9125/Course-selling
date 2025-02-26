import {create} from "zustand"

import axios from "axios"
import { adminEndPoint, userEndPoint } from "../config";
import toast from "react-hot-toast";

interface Category{
    id: string,
    name: string,
    categoryId: string,
    image: string,
    index: number;
}

interface CategoryStore {
    categories: Category[];
    loading: boolean;
     fetchCategories: () => Promise<void>;
     updateCategoryIndex: (categoryId: string, index: number) => Promise<void>;
  }

  interface CategoryStore {
    categories: Category[];
    singleCateogry:null|Category
    loading: boolean;
    fetchCategories: () => Promise<void>;
    updateCategoryIndex: (categoryId: string, index: number) => Promise<void>;
    deleteCateogry: (categoryId: string) => Promise<void>;
    fetchSingleCategory: (categoryId: string) => Promise<void>;
  }
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  
  export const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [],
    loading: false,
    singleCateogry:null,
    
    fetchCategories: async () => {
      set({ loading: true });
      try {
        const response = await axios.get(`${userEndPoint}/category`); // Adjust API endpoint
        
        set({ categories: response.data.categories, loading: false });
      } catch (error) {
        console.error('Error fetching categories:', error);
        set({ loading: false });
      }
    },
    
  
    updateCategoryIndex: async (categoryId, index) => {
      set({ loading: true });
      try {
        await axios.put(`${adminEndPoint}/category/update/${categoryId}`, { index }); // Update index API
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId ? { ...cat, index } : cat
          ),
        }));
        set({ loading: false });
      } catch (error) {
        console.error('Error updating category index:', error);
        set({ loading: false });
      }
    },
    deleteCateogry: async (categoryId) => {
      try {
        const response=await axios.delete(`${adminEndPoint}/category/delete/${categoryId}`,{
          headers:{
            "Authorization":token,
            "Content-Type":"application/json"
          }
        }); // Delete category API
         if (response.status==200)toast.success("Category deleted successfully")
        set((state) => ({
          categories: state.categories.filter((cat) => cat.categoryId !== categoryId),
        }));
      } catch (error) {
        toast.error("P2003 Error while deleting category")
      }
    },
    fetchSingleCategory:async(categoryId)=>{
      set({ loading: true });  // Set loading to true when fetching category
      try{
        const response = await axios.get(`${userEndPoint}/category/${categoryId}`)
        set({singleCateogry: response.data.category,loading: false})
    }
    catch (error) {
      console.error(" Error while fetching category")
      set({ loading: false });
    }
  }}
));