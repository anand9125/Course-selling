import { SigninScheme, SignupSchema } from "../types";
import express from "express"
import { Request, Response } from 'express';
export const authRoutes= express.Router();
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client";
const client =new PrismaClient()
import { JWT_PASSWORD } from "../config";
import jwt from "jsonwebtoken"
import cloudinary from "../lib/cloudnary";
import {node} from "../config"
import { UploadedFile } from 'express-fileupload';
import Cookies from "js-cookie";
export const signup = async(req: Request, res: Response): Promise<void> => {
    const parseData = SignupSchema.safeParse(req.body)
    if(!parseData.success){
        res.status(400).json({
        message:"Invalid inputs"
    })
    return;
    }
    const hashPassword = await bcrypt.hash(parseData.data.password,10)
    try{
    const existUser = await client.user.findUnique({
       where:{
         username:parseData.data.username
      }
    })
    if(existUser){
       res.status(400).json({
        message:"User already exist"
    })
     return;

    }
    const user = await client.user.create({
      data:{
         fullName:parseData.data.fullName ?? "default",
         username:parseData.data.username,
         password:hashPassword,
         createdAt: new Date()
      }
    })
    let tokenData;
    if(user){
        const token = jwt.sign({ userId:user.id},JWT_PASSWORD,{expiresIn:"7d"} )
     
        tokenData=token
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: false,
            sameSite: "lax", // Changed from "none" to "lax"
            secure: true
        });   
    }
     res.status(200).json({  
       id:user.id,
       fullName:user.fullName,
       username:user.username,
       profilePic:user.profilePic,
       createdAt:user.createdAt,
       updatedAt:user.updatedAt,
       token:tokenData
     })
     
    }
     catch(err){
     res.status(500).json({
     message:"Internal Server Error"


    })
}}

export const signin = async(req:Request,res:Response)=>{
    const parseData = SigninScheme.safeParse (req.body)
    if(!parseData.success){
        res.status(400).json({
        message:"Invalid inputs"
        })
        return;
    }
    try{
        const user = await client.user.findUnique({
            where:{
                username:parseData.data.username
            }
        })
        if(!user){
            res.status(401).json({
                message:"user not found please signup"
            })
            return;
        }
        const isMatch = await bcrypt.compare(parseData.data.password,user.password)
        if(!isMatch){
            res.status(401).json({
                message:"Invalid credentials"
            })
            return;
        }
         const token = jwt.sign({ userId: user.id }, JWT_PASSWORD,{expiresIn:"7d"});
         Cookies.set('jwt', token);
        
         res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true, // Prevent client-side scripts from accessing the cookie
            sameSite: 'none', // Allow cross-site cookies
            secure: process.env.NODE_ENV === 'production' // Secure in production
        });
        

        res.status(200).json({
            id:user.id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic,
            createdAt:user.createdAt,
            updatedAt:user.updatedAt,
            token:token
        })
    }
    catch(err){
        res.status(500).json({
            message:"Failed to login"
        })
    }
}



export const updateProfile = async (req: Request, res: Response) => {
    try {
        // Check if file exists in request
        if (!req.files || !req.files.profilePic) {
            res.status(400).json({
                message: "Profile pic is not available"
            });
            return;
        }

        const userId = req.userId;
        if (!userId) {
            res.status(400).json({
                message: "User ID is missing"
            });
            return;
        }

        // Get the file from request
        const file = req.files.profilePic as UploadedFile;

        let uploadResponse;
        try {
            // Upload to Cloudinary
            uploadResponse = await cloudinary.uploader.upload(file.tempFilePath); 
        } catch (uploadError) {
            console.error("Cloudinary Upload Error:", uploadError);
            res.status(500).json({
                message: "Failed to upload profile picture"
            });
            return;
        }

        const updatedUser = await client.user.update({
            where: {
                id: userId
            },
            data: {
                profilePic: uploadResponse.secure_url
            }
        });
        console.log(updatedUser)
        res.status(200).json({
            updatedUser
        });

    } catch (e) {
        console.error("Update Profile Error:", e);
        res.status(500).json({
            message: "Failed to update profile pic"
        });
    }
};

export  const checkAuth = async(req:Request, res:Response) => {
    try{
        res.status(200).json({
            id:req.userId

        })
    }  
    catch(e){
        res.status(500).json({
            message:"Failed to check auth"
        })
    }
}



//file.tempFilePath is a property provided by the express-fileupload middleware that contains the path to a temporary file created on the server when a file is uploaded.