import {prismaClient} from "@repo/db/src";
import { Request,Response } from "express";
import { createCategorySchema, updateCategoryIndexSchema, updateCategorySchema } from "../types";

const client =  prismaClient
export const createCategory = async (req: Request, res: Response) => {
    const parseData = createCategorySchema.safeParse(req.body);

    if (!parseData.success) {
         res.status(400).json({
            message: "Invalid data",
            errors: parseData.error.format()
        });
        return
    }

    try {
        const { categoryId, name, image } = parseData.data;
        let { index } = parseData.data; 

       
        const categoryExists = await client.category.findUnique({
            where: { categoryId }
        });

        if (categoryExists) {
            res.status(409).json({
                message: "Category already exists"
            });
            return
        }
        const lastCategory = await client.category.findFirst({
            orderBy: { index: "desc" }
        });

        if (index == null) {
            index = lastCategory ? lastCategory.index + 1 : 1;
        }   // If index is already in use, shift all greater or equal indexes up 
        else {
            await client.category.updateMany({
                where: { index: { gte: index } },
                data: { index: { increment: 1 } }
            });
        }
        const category = await client.category.create({
            data: {
                categoryId,
                name,
                index,
                image
            }
        });

        res.status(201).json({
            message: "Category created successfully",
            category
        });

    } catch (error: any) {
        console.error("Error creating category:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
        return
    }
};

export const updateCategory= async(req:Request,res:Response)=>{
    const {categoryId } = req.params;
    const parseData = updateCategorySchema.safeParse(req.body);
    if(!parseData.success){
        res.status(400).json({
            message: "Invalid data"
        })
        return;
    }
    try{
        let{index} = parseData.data
        const lastCategory = await client.category.findFirst({
            orderBy: { index: "desc" }
        });

        if (index == null) {
            index = lastCategory ? lastCategory.index + 1 : 1;
        }   // If index is already in use, shift all greater or equal indexes up 
        else {
            await client.category.updateMany({
                where: { index: { gte: index } },
                data: { index: { increment: 1 } }
            });
        }

        const category = await client.category.update({
            where:{
                categoryId
            },
            data:parseData.data
        })
        res.status(200).json({
            message: "Category updated successfully",
            category
        })
    }
    catch(error){
        res.status(500).json({
            message: "Internal Server Error",
            error
        })
    }
}

export const deleteCategory= async(req:Request,res:Response)=>{
    const {categoryId } = req.params;
    try{
        await client.category.delete({
            where:{
                categoryId
            }
        })
        res.status(200).json({
            message: "Category deleted successfully"
        })
    }
    catch(error){
        res.status(500).json({
            message: "Internal Server Error",
            error
        })
    }
}

export const getAllCategories = async(req:Request,res:Response)=>{
    try{
        const categories = await client.category.findMany()
        res.status(200).json({
            message: "Categories fetched successfully",
            categories: categories
        })
    }
    catch(error){
        res.status(500).json({
            message: "Internal Server Error",
            error
        })
    }
}

export const getSingleCategory=async(req:Request,res:Response)=>{
    const {categoryId } = req.params;
    try{
        const category = await client.category.findUnique({
            where:{
                categoryId
            }
        })
        if(!category){
            res.status(404).json({
                message: "Category not found"
            })
            return;
        }
        res.status(200).json({
            message: "Category fetched successfully",
             category
        })
    }
    catch(error){
        res.status(500).json({
            message: "Internal Server Error",
            error
        })
    }
}

export const updateCategoryIndex = async (req:Request, res:Response) => {
    const{categoryId}=req.params;
    const parseData = updateCategoryIndexSchema.safeParse(req.body);
    if(!parseData.success){
        res.status(400).json({
            message: "Invalid data"
        })
        return;
    }
  try{
    const existingCategory = await client.category.findUnique({
        where: { categoryId: categoryId },
      });

  if (!existingCategory) throw new Error("Category not found");
  await client.category.updateMany({
    where: {
        index: { gte: parseData.data.newIndex },
      },
      data: {
        index: { increment: 1 },
      },
    });
    await client.category.update({
      where: { categoryId: categoryId },
      data: { index: parseData.data.newIndex },
    });
    res.status(200).json({
      message: "Category index updated successfully",
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export const getCategoryByMentorId = async (req:Request, res:Response) => {
    const { mentorId } = req.params;
    try{
        const mentor = await client.mentor.findUnique({
            where: { mentorId: mentorId }
        })
        const category = await client.category.findFirst({
            where:{
                id:mentor?.categoryId
            }
        })
        res.status(200).json({
            message: "Category fetched successfully",
            category: category
        })
    }catch(err) {
        res.status(500).json({
            message: "Internal Server Error",
            err
        })
    }

}