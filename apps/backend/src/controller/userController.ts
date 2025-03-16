import {prismaClient} from "@repo/db/src";
import{ Request, Response } from "express" 
import { SigninSchema, SignupSchema } from "../types";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_PASSWORD } from "../types/config"
import { adminPassword } from "../types/config";
const client =  prismaClient
import { Resend } from "resend";
const resend = new Resend("re_TdcBvneT_5DbUwu19BWBNR3MJ6CEUxB7o"); // Resend API key
export const userSignUp = async (req: Request, res: Response) => {
    const parseData = SignupSchema.safeParse(req.body);
    if (!parseData.success) {
         res.status(401).json({
             message: parseData.error
         });
        return
    }

    const hashedPassword = await bcrypt.hash(parseData.data.password, 10);

    try {       
        const existingUser = await client.user.findFirst({
            where: { email: parseData.data.email }
        });
        if (existingUser) {
            res.status(403).json({
              message: "User already exists"
             });
         return
        }    
        function generateReferralCode(length: number = 5): string {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let referralCode = '';
            for (let i = 0; i < length; i++) {
                referralCode += characters[Math.floor(Math.random() * characters.length)];
            }
            return referralCode;
        }
        const referralCode = generateReferralCode(5);     
        const user = await client.user.create({
            data: {
                name: parseData.data.name,
                email: parseData.data.email,
                password: hashedPassword,
                isInCollege: parseData.data.isInCollage,
                college: parseData.data.college,
                branch: parseData.data.branch,
                year: parseData.data.year,
                referralCode: referralCode,
                profileCompleted: true
            }
        });      
        const token = jwt.sign({ userId: user.id }, JWT_PASSWORD);
        res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                college: user.college,
                branch: user.branch,
                year: user.year,
                referralCode: user.referralCode,
                walletBalance: user.walletBalance,
                profileCompleted: user.profileCompleted,
                role: user.role,
                referredById: user.referredById
            },
            token: { token: token }
            
        });
        return
    } catch (error: any) {
         res.status(500).json({ message: "Something went wrong", error });
    }
    return
};


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
              res.status(202).json({
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
              res.status(403).json({
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
          return
        }
        catch(e){
            res.status(500).json({
            message:"Internal Server Error"
            })
            return
        }
}

export const walletBalance = async (req:Request,res:Response)=>{

    const {userId} = req.params;
    try{
        const user = await prismaClient.user.findUnique({
            where:{
                id:userId
            }
        })
        if(!user){
            res.status(404).json({
                message:"User not found"
            })
            return;
        }
        res.json({
            walletBalance:user.walletBalance
        })
        return
    }
    catch(e){
        res.status(500).json({
            message:"Internal Server Error"
        })
        return
    }
}

export const verifyRefrellCode = async (req:Request,res:Response)=>{
    const {referralCode,userId} = req.body;
    try{
        const referrer = await prismaClient.user.findUnique({
            where:{
                referralCode:referralCode
            }
        })
        if(!referrer){
            res.status(400).json({
                message:"Referral code is not valid"
            })
            return;
        }
        else{
            await prismaClient.user.update({
                where:{
                    id:userId
                },
                data:{
                    referredById:referrer.id,
                }
            })
            res.status(200).json({
               message:"Referral code is valid"
           })
           return
        }         
    }
    catch(e){
        res.status(400).json({
            message:"Referral code is not valid"
        })
        return
        
    }
}


export const removeBalance = async (req: Request, res: Response) => {
    const { userId } = req.params;
    
    if (!userId) {
         res.status(400).json({ message: "User ID is required" }); 
        return
    }

    try {
        await client.user.update({
            where: { id: userId },
            data: { walletBalance: 0 },
        });

         res.status(200).json({ message: "Balance removed successfully" }); 
         return
    } catch (error) {
        console.error("Error removing balance:", error);
       res.status(500).json({ message: "Something went wrong" });
       return  
    }
};

export const postEmail = async(req:Request,res:Response)=>{
    const {name,email,walletBalance,phoneNumber} =req.body;
     try{
        await resend.emails.send({
            from: "anand.chaudhary@coursehubb.store",
            replyTo: "coursehubb.store@gmail.com",
            to: "achaudharyskn@gmail.com", 
            subject: "🎉 Process Reward for User",
            text: `Dear Admin,      
            ${name} has successfully completed a transaction and is eligible for a reward. Please process the reward as per the details below:     
            User Details:  
            - Email: ${email}  
            - Reward Amount: ₹${walletBalance} 
            -UPI number:${phoneNumber}  
            Best regards,  
            Course Hub Support Team`
            });
            res.status(200).json({
                message:"Email sent successfully"
            })
            return
       }
     catch(e){
        res.status(500).json({
            message:"Something went wrong"
        })
        return
     }
        

}