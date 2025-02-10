import axios from "axios"
import {create} from "zustand"
import { userEndPoint } from "../utils/config"

interface CourseStore{
    courses: any[],
    isLoading: boolean,
    error: any,
    fetchCourses: (categoryId:string,mentorId:string,) => Promise<void>,
    // updateCourseIndex: (courseId: string, index: number) => Promise<void>,
}


export const useCoursesStore = create<CourseStore>((set)=>({
    courses:[],
    isLoading:false,
    error:null,
    fetchCourses: async (categoryId,mentorId) => {
        set({isLoading:true})
        try{
            const response = await axios.get(`${userEndPoint}/course/getCourse/${categoryId}/${mentorId}`)
            set({courses:response.data.courses, isLoading:false})
        }catch(err){
            set({ isLoading:false})
        }
    },
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


}))