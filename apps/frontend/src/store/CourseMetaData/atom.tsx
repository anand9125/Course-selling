import { selector } from "recoil"
import axios from "axios"
import { userEndPoint } from "../../config";

interface CourseWithMetadata{
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
    mentor: Mentor;
    category: Category;
  
  }
  interface Mentor{
      id: string,
      mentorId:string,
      name: string,
      image: string,
      index: number   
  }
  interface Category {
    id: string;
    categoryId: string;
    name: string;
    image: string;
    index: number;
  }
  



export const  allCoursesWithMetadata=selector< CourseWithMetadata[]>({
    
    key:"getAllBookselector",
    get:async()=>{
      
      try {
        const response = await axios.get(`${userEndPoint}/course`);
        console.log(response.data,"fdg")
        return  response.data.courses
        
        }catch(err){
         console.error("Error while fetching book",err)
         return {err: "Error to fetch book"}
    }
    }
})

