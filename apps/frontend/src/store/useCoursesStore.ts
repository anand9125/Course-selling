import axios from "axios"
import {create} from "zustand"
import { userEndPoint } from "../utils/config"

interface Courses{
    id: string,
    title:string,
    courseId:string,
    price:number,
    actualPrice:number
    description: string,
    categoryId: string,
    mentorId: string,
    image: string,
    index: number,
    
}

interface Mentor{
    id: string,
    mentorId:string,
    name: string,
    image: string,
    index: number   
}


interface CourseStore {
    courses: Courses[];// Update type if you have a Course model

    isLoading: boolean;
    error: string | null;
    mentor: Mentor | null; 
    fetchCourses: (categoryId: string, mentorId: string) => Promise<void>;
    fetchMentorById: (mentorId: string) => Promise<void>;
   
  }
  
  export const useCoursesStore = create<CourseStore>((set) => ({
    courses: [],
    isLoading: false,
    error: null,
    mentor:null,
  
  
    fetchCourses: async (categoryId, mentorId) => {
      set({ isLoading: true });
      try {
        const response = await axios.get(`${userEndPoint}/course/getCourse/${categoryId}/${mentorId}`);
        set({ courses: response.data.courses, isLoading: false });
      } catch (err) {
        set({ isLoading: false, error: "Failed to fetch courses" });
      }
    },
  
    fetchMentorById: async (mentorId) => {
      set({ isLoading: true });
      try {
        const response = await axios.get(`${userEndPoint}/mentor/${mentorId}`);
        set({ mentor: response.data.mentor, isLoading: false });
      } catch (err) {
        set({ isLoading: false, error: "Failed to fetch mentor" });
      }
    },
  
  }));

  
    // updateCourseIndex: (courseId: string, index: number) => async () => {
    //     try{
    //         await axios.put(`${userEndPoint}/course/updateIndex/${courseId}`, {index})
    //     }catch(err){
    //         console.error('Error updating course index:', err)
    //     }
    // },
    // deleteCourse: (courseId: string) => async () => {
    //     try{
    //         await axios.delete(`${userEndPoint}/course/delete/${courseId}`)
    //     }catch(err){
    //         console.error('Error deleting course:', err)
    //     }
    // },

