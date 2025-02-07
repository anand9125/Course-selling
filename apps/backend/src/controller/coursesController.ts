import {PrismaClient} from "@prisma/client";
import { CreatecoursesSchema,updateCourseSchema } from "../types"
import { Request,Response } from "express";

const client = new PrismaClient()
export const createCourses = async(req:Request,res:Response)=>{
    const parseData = CreatecoursesSchema.safeParse(req.body);
    console.log( parseData.error)
    if(!parseData.success){
        res.status(400).json({
            message: "Invalid data"
        })
        return;
    }
    try{
    let category = await client.category.findUnique({
        where:{
            categoryId:parseData.data.categoryId
        }

    })
    console .log("category is  found", category)
    if(!category){
        category = await client.category.create({
            data:{
                categoryId:parseData.data.categoryId,
                name:parseData.data.categoryName as string, 
            }
        })
    }

    let mentor = await client.mentor.findUnique({
        where:{
            mentorId:parseData.data.mentorId
        }
    })
    console.log("mentor is found" ,mentor)
    if(!mentor){
        mentor = await client.mentor.create({
            data:{
                mentorId:parseData.data.mentorId,
                name:parseData.data.mentorName as string,
                image:parseData.data.mentorImage as string,
                category:{
                    connect:{
                        id:category.id  //For each category, it connects the user to that category by category.id
                    }
                }
            }
        })
    }
    const course = await client.course.create({
        data:{
            image:parseData.data.image,
            courseId:parseData.data.courseId,
            title:parseData.data.title,
            description:parseData.data.description,
            price: parseData.data.price,
            actualPrice:parseData.data.actualPrice,
            category:{
                connect:{
                    id:category.id
                }
            },
            mentor:{
                connect:{
                    id:mentor.id
                }
            }
        }
    })
    res.status(201).json({
        message: "Course created successfully",
        data: course
    })
   }
    catch(err){
        console.error("Error creating course",err)
        res.status(500).json({
            message: "Failed to create course"
        })
        return;
    }   
}

export const getAllCourses = async(req:Request,res:Response)=>{
    try{
        const courses = await client.course.findMany()
        res.json({
            courses: courses
        })
    }
    catch(err){
        console.error("Error fetching courses",err)
        res.status(500).json({
            message: "Failed to fetch courses"
        })
        return;
    }
}

export const getSingleCourse = async(req:Request,res:Response)=>{
    const courseId = req.params.courseId;
    try{
        const course = await client.course.findUnique({
            where:{
                courseId:courseId
            }
        })
        if(!course){
            res.status(404).json({
                message: "Course not found"
            })
            return
        }
        res.json({
            course: course
        })
    }
    catch(err){
        console.error("Error fetching course by id",err)
        res.status(500).json({
            message: "Failed to fetch course"
        })
        return;
    }
}

export const updateCourseById = async(req:Request,res:Response)=>{
    const courseId = req.params.courseId;
    
    const parseData = updateCourseSchema .safeParse(req.body)
    if(!parseData.success){
        res.status(400).json({
            message: "Invalid data"
        })
        return;
    }
    try{
        
        const existCourse = await client.course.findUnique({
            where:{
                courseId:courseId
            }
        })
        if(!existCourse){
            res.status(404).json({
                message: "Course not found"
            })
            return
        }
        const updatedCourse = await client.course.update({
            where:{
                id:existCourse.id
            },
            data:parseData.data
        })
        res.json({
            message: "Course updated successfully",
            data: updatedCourse
        })

    }
    catch(err){
        console.error("Error updating course by id",err)
        res.status(500).json({
            message: "Failed to update course"
        })
    }
    
}

export const deleteCourseById = async(req:Request,res:Response)=>{
    const courseId = req.params.courseId;
    try{
        const existCourse = await client.course.findUnique({
            where:{
                courseId:courseId
            }
        })
        if(!existCourse){
            res.status(404).json({
                message: "Course not found"
            })
            return
        }
        await client.course.delete({
            where:{
                id:existCourse.id
            }
        })
        res.json({
            message: "Course deleted successfully"
        })
    }
    catch(err){
        console.error("Error deleting course by id",err)
        res.status(500).json({
            message: "Failed to delete course"
        })
    }
}
    
export const getCoursesByCategoryId = async (req: Request, res: Response) => {
    const { categoryId } = req.params; // Assuming you pass `categoryId` in the URL

    try {
        // 🔹 Find the category by `categoryId`
        const category = await client.category.findUnique({
            where: { categoryId },
            include: {
                courses: {
                    include: {
                        mentor: true,  // Include mentor details if needed
                    }
                }
            }
        });
       if(!category){
        res.status(404).json({ message: "Category not found" });
         return;
       }

       res.status(200).json({
            message: "Courses fetched successfully",
            data: category.courses
        });


    } catch (err) {
        console.error("Error fetching courses", err);
         res.status(500).json({ message: "Failed to fetch courses" });
    }
};


export const getCoursesByMentor= async(req:Request,res:Response)=>{
    const mentorId = req.params.mentorId;
    try{
       const Mentor = await client.mentor.findUnique({
        where:{
            mentorId:mentorId
        },
        include:{
            courses:{
                include:{
                    category:true  // Include category details if needed
                }
            }
        }
       })
       if(!Mentor){
        res.status(404).json({ message: "Mentor not found" });
         return;
       }
       res.status(200).json({
            message: "Courses fetched successfully",
            data: Mentor.courses
        })
    }
    catch(err){
        console.error("Error fetching courses by mentor",err)
        res.status(500).json({
            message: "Failed to fetch courses"
        })
    
}}