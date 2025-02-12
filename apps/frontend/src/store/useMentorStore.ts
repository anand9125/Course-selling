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

interface MentorStore{
    mentors: Mentor[],
    isLoading: boolean,
    error: string | null,
    fetchMentors: (categoryId:string) => void,
    // fetchMentorById: (mentorId: string) => void,
    getCategoryByCategoryId:(categoryId:string) => void
    category:Category|null
}

export const useMentorStore = create<MentorStore>((set)=>({
    mentors:[],
    isLoading:false,
    error:null,
    category:null,
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
  }
}))