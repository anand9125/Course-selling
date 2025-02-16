import axios from "axios"
import {create} from "zustand"
import { userEndPoint } from "../utils/config"

interface Mentor{
    id: string,
    mentorId:string,
    name: string,
    image: string,
    index: number   
}
interface Category{
    id: string,
    name: string,
    categoryId: string,
    image: string,
    index: number;
}
interface MentorWithCategory{
    id: string,
    mentorId:string,
    name: string,
    image: string,
    index: number,
    category: Category  
}

interface MentorStore{
    mentors: Mentor[],
    isLoading: boolean,
    allMentors: MentorWithCategory[],
    error: string | null,
    fetchMentors: (categoryId:string) => void,
    // fetchMentorById: (mentorId: string) => void,
    getCategoryByCategoryId:(categoryId:string) => void,
    fetchAllMentors: () => void,
    category:Category|null
    getCategory:Category|null
    fetchCateogryByMentorId:(mentorId:string)=>Promise<void>
  
}

export const useMentorStore = create<MentorStore>((set)=>({
    mentors:[],
    isLoading:false,
    allMentors:[],
    error:null,
    category:null,
    getCategory:null,
  
    fetchMentors: async ( categoryId) => {
        set({isLoading:true})
        try{
            const response = await axios.get(`${userEndPoint}/mentor/category/${categoryId}`)
            set({mentors:response.data.mentors, isLoading:false})
        }catch(err){
            set({ isLoading:false})
        }
    },
    getCategoryByCategoryId:async(categoryId)=>{
        set({isLoading:true})
        try{
            const response = await axios.get(`${userEndPoint}/category/${categoryId}`)
            set({category:response.data.category, isLoading:false})
        }catch(err){
            set({ isLoading:false})
    }
  },
  fetchAllMentors: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${userEndPoint}/mentor`);
      set({ allMentors: response.data.mentors, isLoading: false });
    } catch (error) {
      console.error('Error fetching all mentors:', error);
      set({ isLoading: false });
    }
  }, 
   fetchCateogryByMentorId:async(mentorId)=>{
    set({ isLoading: true });
    try {
      console.log("i am mentor id",mentorId)
      const response = await axios.get(`${userEndPoint}/category/mentor/${mentorId}`);
      console.log(response.data.category,"i am chutiya")
      set({ getCategory: response.data.category, isLoading: false });
    } catch (err) {
      console.log(err," i am error")
      set({ isLoading: false, error: "Failed to fetch category" });
    }
  }

}))