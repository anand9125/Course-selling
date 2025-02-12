import {create} from "zustand"

import axios from "axios"
import { adminEndPoint, userEndPoint } from "../utils/config";

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
    loading: boolean;
    fetchCategories: () => Promise<void>;
    updateCategoryIndex: (categoryId: string, index: number) => Promise<void>;
  }
  
  export const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [],
    loading: false,
  
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
      try {
        await axios.put(`${adminEndPoint}/category/update/${categoryId}`, { index }); // Update index API
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId ? { ...cat, index } : cat
          ),
        }));
      } catch (error) {
        console.error('Error updating category index:', error);
      }
    },
  }));