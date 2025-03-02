import { Request,Response } from "express"
import { createMentorSchema, updateMentorSchema } from "../types"
import {PrismaClient} from "@prisma/client";
import { parse } from "dotenv";


const client = new PrismaClient()

export const createMentor = async(req:Request, res:Response)=>{
   const parseData = createMentorSchema.safeParse(req.body)

   if(!parseData.success){
    res.status(400).json({
        
        message:"Invalid data"
    })
    return;
   }
   try{
    const mentor=await client.$transaction(async(tx:any)=>{
    let categories=await client.category.findUnique({
        where:{
            categoryId:parseData.data.categoryId
        }
    })
  

     let Categoryindex = parseData.data.categoryIndex; 
     if(!categories){
        const lastCategory = await client.category.findFirst({
            orderBy: { index: "desc" }
        });

        if ( Categoryindex == null) {
            Categoryindex= lastCategory ? lastCategory.index + 1 : 1;
        }   
        else {
            await client.category.updateMany({
                where: { index: { gte: Categoryindex } },
                data: { index: { increment: 1 } }
            });
        }
        categories = await client.category.create({
            data:{
                categoryId:parseData.data.categoryId,
                name:parseData.data.categoryName as string,
                image:parseData.data.categoryImg as string,
                index: Categoryindex
            }
        })
    }

    let{index} = parseData.data;
    const lastMentor = await client.mentor.findFirst({
        orderBy: {
            index: 'desc'
        }
    })
    if(index==null){
        index = lastMentor? lastMentor.index+1:1
    }
    else{
        await client.mentor.updateMany({
            where: { index: { gte: index } },
            data: { index: { increment: 1 } }
        });
    }
    const mentor = await client.mentor.create({
        data:{
            mentorId:parseData.data.mentorId,
            name:parseData.data.name,
            image:parseData.data.image,
            index,
            category:{
                connect:{
                    id:categories.id
                }
            }
        }
    })
    res.status(201).json({
        message:"Mentor created successfully",
        mentors:mentor
    })
    }
    )}
    catch(err){
        res.status(500).json({
            message:"Error while creating mentor"
        })
    }
}

export const getAllMentor = async(req:Request, res:Response)=>{
    
    try{
        const mentor= await client.mentor.findMany({
         include:{
            category:true
         }   
        })
        res.status(200).json({
        message:"Mentors fetched successfully",
        mentors:mentor
    })
    }
    catch(err){
        res.status(500).json({
            message:"Error while fetching mentors"
        })
    }

}

export const getSingleMentor= async(req:Request, res:Response)=>{
        const mentorId = req.params.mentorId
       try{
        const mentor = await client.mentor.findUnique({
            where:{
                mentorId
            },include:{
                category:true
            }
        })
        if(!mentor){
            res.status(404).json({
                message:"Mentor not found"
            })
        }
        res.status(200).json({
            message:"Mentor fetched successfully",
            mentor:mentor
        })
       }
       catch(err){
        res.status(500).json({
            message:"Error while fetching mentor"
        })
       }
}


export const updateMentor = async(req:Request, res:Response)=>{
        const mentorId = req.params.mentorId;
        const parseData = updateMentorSchema.safeParse(req.body)
        if(!parseData.success){
            res.status(400).json({
                message:"Invalid data"
            })
            return;
        }
    try{
        let{index} = parseData.data
        const lastMentor = await client.mentor.findFirst({
            orderBy: { index: "desc" }
        });

        if (index == null) {
            index = lastMentor ? lastMentor.index + 1 : 1;
        }   // If index is already in use, shift all greater or equal indexes up 
        else {
            await client.mentor.updateMany({
                where: { index: { gte: index } },
                data: { index: { increment: 1 } }
            });
        }
        const existingMentor = await client.mentor.findUnique({
            where:{
                mentorId
            }
        })

        if(!existingMentor){
            res.status(404).json({
                message:"Mentor not found"
            })
            return;
        }
        const updatedMentor = await client.mentor.update({
            where:{
                id: existingMentor.id
            },
            data:parseData.data
        })
        res.status(200).json({
            message:"Mentor updated successfully",
            data:updatedMentor
        })
        
    }
    catch(err){
        res.status(500).json({
            message:"Error while updating mentor"
            ,err
        })
    }
}


export const deleteMentor=async(req:Request,res:Response)=>{
     const mentorId = req.params.mentorId;
    try{
        const mentor = await client.mentor.delete({
            where:{
                mentorId
            }
        })
        res.status(200).json({
            message:"Mentor deleted successfully"
        })
    }
    catch(err){
        res.status(500).json({
            message:"Error while deleting mentor"
        })
    }
}

export const getCategroyMentor = async(req:Request,res:Response)=>{
    const categoryId = req.params.categoryId;

    try{
        const category = await client.category.findUnique({
            where:{
                categoryId
            }
        })
   
        const mentors = await client.mentor.findMany({
            where:{
                categoryId:category?.id
                
            }
        })
        res.status(200).json({
            message:"Mentors fetched successfully for the given category",
            mentors
        })
    }
    catch(err){
        res.status(500).json({
            message:"Error while fetching mentors for the given category"
        })
    }
 
}

export const selectedMentor = async(req:Request,res:Response)=>{
    const {mentorId} = req.body;
    try{
        const  updatedSetting = await client.adminSettings.upsert({
            where: { id: "admin-setting" }, // Assume there's a single row for admin settings
            update: { selectedMentorId: mentorId },
            create: { id: "admin-setting", selectedMentorId: mentorId },
        })
        res.json({
             message: "Mentor selection updated",
             data: updatedSetting
        });
      } catch (error) {
        console.error("Error updating mentor selection:", error);
        res.status(500).json({
          error: "Failed to update mentor selection"
        });
    }
    }
    
