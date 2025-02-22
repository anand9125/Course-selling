import {PrismaClient} from "@prisma/client";
import{ Request, Response } from "express" 
import { SigninSchema, SignupSchema } from "../types";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_PASSWORD } from "../config"
import { adminPassword } from "../types/config";
const client = new PrismaClient()

export const userSignUp = async (req: Request, res: Response)=>{
   
    const parseData = SignupSchema.safeParse(req.body);
    if(!parseData.success){
        res.status(401).json({
            message:parseData.error
        })
        return;
    }
    const hashedPassword = await bcrypt.hash(parseData.data.password, 10);
    try{
        const exitUser = await client.user.findFirst({
            where:{
                email:parseData.data.email
            }
        })
        if(exitUser){
            res.status(403).json({
                message:"User already exist"
            })
            return;
        }
        function generateReferralCode(length: number = 5): string {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let referralCode = '';
            
            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * characters.length);
              referralCode += characters[randomIndex];
            }
          
            return referralCode;
          }
          const referralCode = generateReferralCode(5);
        //   const categories = await client.category.findMany({
        //     where:{
        //         name:{
        //             in:parseData.data.categoryNames
        //         }
        //     },
        //     select:{
        //         id:true
        //     }
        //   })
        const user = await client.user.create({
            data:{
                name:parseData.data.name,
                email:parseData.data.email,
                password:hashedPassword,
                isInCollege:parseData.data.isInCollage,
                college:parseData.data.college,
                branch:parseData.data.branch,
                year:parseData.data.year,
                referralCode:referralCode,
                // userCategories:{
                //     create:categories.map((category)=>({  //Loops through the categories array
                //         category:{
                //             connect:{
                //                 id:category.id   //For each category, it connects the user to that category by category.id
                //             }
                //         }
                //     }))
                // },
                profileCompleted:true
            }
        })
        const token = jwt.sign({userId:user.id},JWT_PASSWORD)
        res.json({
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                college:user.college,
                branch:user.branch,
                year:user.year,
                referralCode:user.referralCode,
                walletBalance:user.walletBalance,
                profileCompleted:user.profileCompleted,
                role:user.role
            },
            token:{
                token:token
            }
        })
    }
    catch(e){
        res.status(500).json({
            message:"Something went wrong"
        })
    }



}

export const userSignIn= async(req:Request,res:Response)=>{
    const parseData = SigninSchema.safeParse(req.body)
    if(!parseData.success ){
        res.status(401).json({
            message:"Invalid inputs"
        })
        return;
    }

    try{  
          const user = await client.user.findUnique({
             where:{
                 email:parseData.data.email
             }
          })
          if(!user){
              res.status(404).json({
                  message:"User is not found please Signup "
              })
            return;
          }
          if (parseData.success && parseData.data.password === adminPassword) {
             const  updateRole = await client.user.update({
                 where:{
                     id:user.id
                 },
                 data:{
                     role:"ADMIN"
                 }
             })
             const token = jwt.sign({userId:user.id},adminPassword)
              res.json({
                 message:"Admin login successful",
                 user:{
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    college:user.college,
                    branch:user.branch,
                    year:user.year,
                    referralCode:user.referralCode,
                    walletBalance:user.walletBalance,
                    profileCompleted:user.profileCompleted,
                    role:user.role
                },
                 token
             })
             return;
          }
          
         const isValid = await bcrypt.compare(parseData.data.password, user.password)
          if(!isValid){
              res.status(401).json({
                 message:"Invalid password"
              })
            return;
          }
          const token = jwt.sign({userId:user.id},JWT_PASSWORD)
          res.json({
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                college:user.college,
                branch:user.branch,
                year:user.year,
                referralCode:user.referralCode,
                walletBalance:user.walletBalance,
                profileCompleted:user.profileCompleted,
                role:user.role
            },
              token
          })
        }
        catch(e){
            res.status(500).json({
                message:"Internal Server Error"
            })
        }
}
