import { Request,Response } from "express"
import { createMentorSchema, updateMentorSchema } from "../types"
import {PrismaClient} from "@prisma/client";


const client = new PrismaClient()

export const createMentor = async(req:Request, res:Response)=>{
   const parseData = createMentorSchema.safeParse(req.body)
   console.log(parseData.error)
   if(!parseData.success){
    res.status(400).json({
        
        message:"Invalid data"
    })
    return;
   }
   try{
     const mentor=await client.$transaction(async(tx)=>{
    let categories=await client.category.findUnique({
        where:{
            categoryId:parseData.data.categoryId
        }
    })
    console.log(categories,"hii")
    if(!categories){
        const lastCategory = await client.category.findFirst({
            orderBy: {
                index: 'desc'
            }
        })
        const categoryIndex = parseData.data.categoryIndex ??(lastCategory ? lastCategory.index+1:1)
        categories = await client.category.create({
            data:{
                categoryId:parseData.data.categoryId,
                name:parseData.data.categoryName as string,
                image:parseData.data.categoryImg as string,
                index:categoryIndex
            }
        })
    }
    console.log("i have crossesd categories", categories)
    const lastMentor = await client.mentor.findFirst({
        orderBy: {
            index: 'desc'
        }
    })
    const mentorIndex = parseData.data.index??(lastMentor? lastMentor.index+1:1)

    const mentor = await client.mentor.create({
        data:{
            mentorId:parseData.data.mentorId,
            name:parseData.data.name,
            image:parseData.data.image,
            index:mentorIndex,
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
        const mentor= await client.mentor.findMany({})
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
        const existingMentor = await client.mentor.findUnique({
            where:{
                mentorId
            }
        })
        console.log(existingMentor,"hey sir i am reached")
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

    console.log(categoryId)
    try{
        const category = await client.category.findUnique({
            where:{
                categoryId
            }
        })
        console.log(category)
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