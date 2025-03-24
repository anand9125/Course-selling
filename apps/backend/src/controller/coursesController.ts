import {prismaClient} from "@repo/db/src";
import { CreatecoursesSchema,updateCourseIndexSchema,updateCourseSchema } from "../types"
import { Request,Response } from "express";
import { Resend } from "resend";
const resend = new Resend("re_TdcBvneT_5DbUwu19BWBNR3MJ6CEUxB7o"); // Resend API key
const client =  prismaClient
export const createCourses = async(req:Request,res:Response)=>{  
    const parseData = CreatecoursesSchema.safeParse(req.body);
    if (!parseData.success) {
      console.error("Validation Error:", parseData.error);
     res.status(400).json({ message: "Invalid data", errors: parseData.error });
     return
    }   
    try{
    const course = await client.$transaction(async(tx:any)=>{
    let category = await client.category.findUnique({
        where:{
            categoryId:parseData.data.categoryId
        }

    })
    console .log("category is  found", category)
    if(!category){
        let categoryIndex = parseData.data.categoryIndex
        const lastCategory = await client.category.findFirst({
            orderBy: { index: "desc" }
        });

        if (categoryIndex == null) {
            categoryIndex  = lastCategory ? lastCategory.index + 1 : 1;
        }   // If index is already in use, shift all greater or equal indexes up 
        else {
            await client.category.updateMany({
                where: { index: { gte: categoryIndex  } },
                data: { index: { increment: 1 } }
            });
        }

        category = await client.category.create({
            data:{
                categoryId:parseData.data.categoryId,
                name:parseData.data.categoryName as string,
                index:categoryIndex,
                image:parseData.data.categoryImg as string,
               
               
            }
        })
        
    }
    let mentor = await client.mentor.findUnique({
        where:{
            mentorId:parseData.data.mentorId
        }
    })
  
    if(!mentor){
        let mentorIndex = parseData.data.mentorIndex;
        const lastMentor = await client.mentor.findFirst({
            orderBy: {
                index: 'desc'
            }
        })
        if(mentorIndex==null){
            mentorIndex= lastMentor? lastMentor.index+1:1
        }
        else{
            await client.mentor.updateMany({
                where: { index: { gte: mentorIndex } },
                data: { index: { increment: 1 } }
            });
        }
        mentor = await client.mentor.create({
            data:{
                mentorId:parseData.data.mentorId,
                name:parseData.data.mentorName as string,
                image:parseData.data.mentorImage as string,
                index:mentorIndex ,
                category:{
                    connect:{
                        id:category.id  //For each category, it connects the user to that category by category.id
                    }
                }
            }
        })
    }
    let courseIndex = parseData.data.index;
    const lastCourse = await client.course.findFirst({
        orderBy: {
            index: 'desc'
        }
    })
    if(courseIndex==null){
        courseIndex = lastCourse? lastCourse.index+1:1
    }
    else{
        await client.course.updateMany({
            where: { index: { gte: courseIndex } },
            data: { index: { increment: 1 } }
        });
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
            },
            index:courseIndex
        }
    })
    res.status(201).json({
        message: "Course created successfully",
         course
    })
    return
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
        const courses = await client.course.findMany({
            include:{
                mentor:true,
                category:true
            }
        })
        res.json({
            courses: courses
        })
        return
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
        return
    }
    catch(err){
        console.error("Error fetching course by id",err)
        res.status(500).json({
            message: "Failed to fetch course"
        })
        return;
    }
}

export const updateCourse = async(req:Request,res:Response)=>{
    const courseId = req.params.courseId;
    
    const parseData = updateCourseSchema .safeParse(req.body)
    if(!parseData.success){
        res.status(400).json({
            message: "Invalid data"
        })
        return;
    }
    try{
        let {index} = parseData.data;
        const lastCourse = await client.course.findFirst({
            orderBy: {
                index: 'desc'
            }
        })
        if(index==null){
            index = lastCourse? lastCourse.index+1:1
        }
        else{
            await client.course.updateMany({
                where: { index: { gte: index } },
                data: { index: { increment: 1 } }
            });
        }
        
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
        res.status(200).json({
            message: "Course updated successfully",
            data: updatedCourse
        })
        return

    }
    catch(err){
        console.error("Error updating course by id",err)
        res.status(500).json({
            message: "Failed to update course"
        })
        return
    }
    
}

export const deleteCourse = async(req:Request,res:Response)=>{
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
        return
    }
    catch(err){
        console.error("Error deleting course by id",err)
        res.status(500).json({
            message: "Failed to delete course"
        })
        return
    }
}
    
export const getCoursesByCategoryid = async (req: Request, res: Response) => {
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
        return
    } catch (err) {
        console.error("Error fetching courses", err);
         res.status(500).json({ message: "Failed to fetch courses" });
    }
    return
};


export const getCoursesByMentorid= async(req:Request,res:Response)=>{
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
        return
    }
    catch(err){
        console.error("Error fetching courses by mentor",err)
        res.status(500).json({
            message: "Failed to fetch courses"
        })
        return
    
}}

export const updateCourseIndex= async(req:Request,res:Response)=>{
  const { courseId} = req.params;
  const parseData = updateCourseIndexSchema.safeParse(req.body)
  if(!parseData.success){
    res.status(400).json({
      message: "Invalid data"
    })
    return;
  }
  try{
    const existingCourse = await client.course.findUnique({
        where:{
          courseId:courseId
        }
      })
      if (!existingCourse) throw new Error("Course not found");
    
      // Shift indexes of other courses that are equal or greater than the new index
      await client.course.updateMany({
        where: {
          index: { gte: parseData.data.newIndex },
        },
        data: {
          index: {
            increment:1
          }
        },
      })
      const updatedCourse = await client.course.updateMany({
        where:{
          courseId:courseId
        },
        data:parseData.data
      })
      res.json({
        message: "Course index updated successfully",
        data: updatedCourse
      })
      return
  }catch(err){
    console.error("Error updating course index",err)
    res.status(500).json({
      message: "Failed to update course index"
    })
    return
  }
  
}

export const getCoursesByCategoryidMentorid = async(req:Request,res:Response)=>{
    const { categoryId, mentorId } = req.params;
    try{
        const category = await client.category.findFirst({
            where:{
                categoryId:categoryId
            }
        })
        const mentor = await client.mentor.findFirst({
            where:{
                mentorId:mentorId
            }
        })
        const courses = await client.course.findMany({
            where:{
                categoryId:category?.id,
                mentorId:mentor?.id
            },
            include:{
                mentor:true,
                category:true
            }
        })
        if(!courses){
            res.status(404).json({ message: "No courses found" });
            return;
        }
        res.status(200).json({
            message: "Courses fetched successfully",
            courses: courses
        })
        return
    }
    catch(err){
        console.error("Error fetching courses by category and mentor",err)
        res.status(500).json({
            message: "Failed to fetch courses"
        })
        return
    }
}


export const getCourseOfSelectedMentor = async (req:Request,res:Response)=>{
    
    try {
        // Get selected mentor from the admin settings
        const adminSetting = await client.adminSettings.findUnique({
          where: { id: "admin-setting" },
        });
    
        if (!adminSetting?.selectedMentorId) {
          res.status(404).json({ error: "No mentor selected" });
          return
        }
        const mentor = await client.mentor.findUnique({
            where:{
                mentorId: adminSetting.selectedMentorId
            }
        })
    
        // Fetch courses of the selected mentor
        const courses = await client.course.findMany({
          where: { mentorId: mentor?.id },
        });
    
        res.status(200).json({
            courses
        })
        return
      } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ error: "Failed to fetch courses" });
      }
      return
    
}

export const sendRequestForCourseMail = async(req:Request,res:Response)=>{
    console.log(req.body)
    const {courseName,mentorName,email,phoneNumber} = req.body;
    try{
        await resend.emails.send({
            from: "ultimatcourses@coursehubb.store",
            replyTo: email, // User's email for direct response
            to: "coursehubb.store@gmail.com",
            subject: "New Course Request",
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #d9534f;">📢 New Course Request</h2>
                <p><strong>Course Name:</strong> ${courseName}</p>
                <p><strong>Mentor Name:</strong> ${mentorName}</p>
                <p><strong>User Email:</strong> ${email}</p>
                <p><strong>Contact Number:</strong> ${phoneNumber}</p>
                
                <p>Please review this request and take the necessary action.</p>
                
                <p style="margin-top: 20px;">
                  <a href="mailto:${email}" style="background-color: #007bff; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Reply to User
                  </a>
                </p>
    
                <hr style="border: 0; height: 1px; background-color: #ddd; margin-top: 20px;">
                <p style="font-size: 14px; color: #777;">This is an automated email from CourseHubb.</p>
              </div>  `
        });
        await resend.emails.send({
            from: "ultimatcourses@coursehubb.store",
            to: email,
            subject: "Your Course Request Has Been Received!",
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #28a745;">✅ Request Received</h2>
                <p>Dear User,</p>
                <p>We have received your request for the following course:</p>
                
                <p><strong>Course Name:</strong> ${courseName}</p>
                <p><strong>Mentor Name:</strong> ${mentorName}</p>
                
                <p>Our team will review your request and get back to you as soon as possible.</p>
    
                <p>If you have any questions, feel free to contact us at 
                  <a href="mailto:coursehubb.store@gmail.com">coursehubb.store@gmail.com</a>.
                </p>
    
                <p>Best regards,<br><strong>CourseHubb Support Team</strong></p>
    
                <hr style="border: 0; height: 1px; background-color: #ddd; margin-top: 20px;">
                <p style="font-size: 14px; color: #777;">This is an automated email from CourseHubb. Please do not reply.</p>
              </div>
            `
        });
        res.status(200).json({
            message: "Request sent successfully"
        })
        return
    }
    catch(err){
        console.error("Error sending request for course mail",err)
        res.status(500).json({
            message: "Failed to send request for course mail"
        })
        return
    }
}