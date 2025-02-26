import axios from "axios"
import {create} from "zustand"
import { adminEndPoint, userEndPoint } from "../utils/config"
import toast from "react-hot-toast";

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
    categoryId: string,
    category: Category  
}

interface MentorStore{
    mentors: Mentor[],
    isLoading: boolean,
    allMentors: MentorWithCategory[],
    error: string | null,
    mentor:Mentor|null,
    fetchMentors: (categoryId:string) => void,
    // fetchMentorById: (mentorId: string) => void,
    getCategoryByCategoryId:(categoryId:string) => void,
    fetchAllMentors: () => void,
    category:Category|null
    getCategory:Category|null
    fetchCateogryByMentorId:(mentorId:string)=>Promise<void>
    deleteMentor:(mentorId:string)=>Promise<void>
    fetchMentorById:(mentorId:string)=>Promise<void>
    putLatestCourseMentorId:(mentorId:string)=>Promise<void>
}
const token = JSON.parse(localStorage.getItem("token") || "{}");
export const useMentorStore = create<MentorStore>((set)=>({
    mentors:[],
    isLoading:false,
    allMentors:[],
    error:null,
    category:null,
    getCategory:null,
    mentor:null,
  
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
    
      const response = await axios.get(`${userEndPoint}/category/mentor/${mentorId}`);
      
      set({ getCategory: response.data.category, isLoading: false });
    } catch (err) {
      
      set({ isLoading: false, error: "Failed to fetch category" });
    }
  },deleteMentor: async (mentorId) => {
    try {
      const response=await axios.delete(`${adminEndPoint}/mentor/delete/${mentorId}`,{
        headers:{
          "Authorization":token,
          "Content-Type":"application/json"
        }
      }); // Delete category API
       if (response.status==200)toast.success("Category deleted successfully")
      set((state) => ({
        allMentors: state.allMentors.filter((ment) =>  ment.mentorId!== mentorId),
      }));
    } catch (error) {
      toast.error("P2003 Error while deleting category")
    }
  },
  fetchMentorById:async(mentorId) =>{
    set({ isLoading: true });
    try {
      const response = await axios.get(`${userEndPoint}/mentor/${mentorId}`);
      set({ mentor: response.data.mentor, isLoading: false });
    } catch (error) {
      console.error('Error fetching mentor by ID:', error);
      set({ isLoading: false });
    }
      
  },
  putLatestCourseMentorId:async(mentorId)=>{
    try {
      const response=await axios.put(`${adminEndPoint}/mentor/selectedMentor`,mentorId,{
        headers:{
          "Authorization":token,
          "Content-Type":"application/json"
        }
      }); // Update latest course ID API
       if (response.status==200)toast.success("Latest Courses updated successfully")
    } catch (error:any) {
      toast.error("error",error)
    }
  }

}))