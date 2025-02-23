import axios from "axios"
import {create} from "zustand"
import { adminEndPoint, userEndPoint } from "../utils/config"
import toast from "react-hot-toast"

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
interface Category{
  id: string,
  name: string,
  categoryId: string,
  image: string,
  index: number;
}
interface CoursesWithMentorCategory{
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
  mentor: Mentor,
  category: Category
}


interface CourseStore {
    courses: Courses[];// Update type if you have a Course model
    allCourses: CoursesWithMentorCategory[];
    isLoading: boolean;
    singleCourse: Courses|null;
    error: string | null;
    mentor: Mentor | null; 
    fetchCourses: (categoryId: string, mentorId: string) => Promise<void>;
    fetchMentorById: (mentorId: string) => Promise<void>;
    fetchAllCourses: () => Promise<void>;
   deleteCourse: (courseId: string) => Promise<void>;
   fetchSingleCourse: (courseId: string) => Promise<void>;
  }
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  export const useCoursesStore = create<CourseStore>((set) => ({
    courses: [],
    isLoading: false,
    error: null,
    mentor:null,
    allCourses:[],
    singleCourse: null,
  
  
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
    fetchAllCourses: async () => {
      set({ isLoading: true });
      try {
        const response = await axios.get(`${userEndPoint}/course/`);
        set({ allCourses: response.data.courses, isLoading: false });
      } catch (err) {
        set({ isLoading: false, error: "Failed to fetch courses" });
      }
    },
    deleteCourse: async (courseId) => {
      set({ isLoading: true });
      try{
        await axios.delete(`${adminEndPoint}/courses/delete/${courseId}`,{
          headers:{
            "Authorization":token,
            "Content-Type":"application/json"
          }
        })
        set({ isLoading: false });
        toast.success(`Course deleted successfully`);
      }
      catch(err:any){
      
        set({ isLoading: false });
        toast.error(`Failed to delete course: ${err.message}`);
      }
    },
    fetchSingleCourse: async (courseId) => {
      set({ isLoading: true });
      try {
        const response = await axios.get(`${userEndPoint}/course/${courseId}`);
        set({ singleCourse: response.data.course, isLoading: false });
      } catch (err) {
        set({ isLoading: false, error: "Failed to fetch course" });
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

