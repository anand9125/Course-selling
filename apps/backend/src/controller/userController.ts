import {prismaClient} from "@repo/db/src";
import{ Request, Response } from "express" 
import { SigninSchema, SignupSchema } from "../types";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_PASSWORD } from "../types/config"
import { adminPassword } from "../types/config";
const client =  prismaClient
import { Resend } from "resend";
import { randomBytes } from "crypto";
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

export const postEmailForredeem = async(req:Request,res:Response)=>{
    const {name,email,walletBalance,phoneNumber} =req.body;
     try{
        await resend.emails.send({
            from: "ultimatcourses@coursehubb.store",
            replyTo: "coursehubb.store@gmail.com",
            to: "coursehubb.store@gmail.com", 
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

export const sendForgetPassowordmail= async(req:Request,res:Response)=>{
    const {email} = req.body;
    const token = randomBytes(32).toString("hex");

   try{
    const user = await prismaClient.user.findUnique({
        where:{
            email
        }
    })
    if(!user){
        res.status(400).json({
            message:"User not found"
        })
        return
    }
    await prismaClient.forgetpassword.create({
        data:{
            token,
            email
        }
    })
    const accessLink = `https://api.coursehubb.store/api/v1/user/access-forgetPasswordPage?token=${token}`;
    await resend.emails.send({
        from: "ultimatcourses@coursehubb.store",
        replyTo: "coursehubb.store@gmail.com",
        to: email,
        subject: "Reset Your Password - CourseHubb",
        text: `Dear Customer,
      
      We received a request to reset your password. Please click the link below to set a new password:
      
      ${accessLink}
      
      This link is valid for a limited time and can be used only once. If you did not request this, please ignore this email.
      
      Best regards,  
      CourseHubb Support Team  
      support@coursehubb.store
        `,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #007bff;">Reset Your Password</h2>
            <p>Dear Customer,</p>
            <p>We received a request to reset your password. Click the button below to proceed:</p>
            <p style="text-align: center;">
              <a href="${accessLink}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Reset Password
              </a>
            </p>
            <p>If the button doesn’t work, you can also use this link:</p>
            <p><a href="${accessLink}" style="word-break: break-word;">${accessLink}</a></p>
            <p>This link is valid for a limited time and can be used only once. If you did not request this, please ignore this email.</p>
            <p>Best regards,</p>
            <p><strong>CourseHubb Support Team</strong></p>
            <p><a href="mailto:support@coursehubb.store">support@coursehubb.store</a></p>
          </div>
        `,
      });
      
      res.status(200).json({ message: "Email sent successfully" });
      return;
   }
   catch(e){
    res.json({
        message:"invalid request"
    })
   }
}

export const rediretForgetPasswordPage = async(req:Request,res:Response)=>{
    const {token} = req.query 
    if (!token) {
         res.status(400).send("Invalid request.");
         return
    }
    
    try{
        const tokenEntry = await prismaClient.forgetpassword.findUnique({
            where:{
                // @ts-ignore
                token:token
            }
        })
        if (!tokenEntry) {
             res.status(400).send("This link has expired or is invalid.");
             return
        }
        res.redirect(`https://coursehubb.store/reset-password/${tokenEntry.email}/${tokenEntry.token}`)
    
    }
    catch(e){
        res.json({
            message:"Invalid request"
        })
    }

} 

export const resetPassword = async(req:Request,res:Response)=>{
    const{token,email,password} = req.body;
    if(!token || !email || !password){
        res.json({
            message:"plese provide all creadentials"
        
        })
        return;
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const updateData = await prismaClient.user.update({
            where:{
                email
            },data:{
                password: hashedPassword
            }
        })
        await prismaClient.forgetpassword.delete({
            where: {
              token: token, 
            },
          });
          
        res.status(200).json({
            message:"user password updated successfully"
        })
    
    }catch(e){
        res.json({
            message:"error while updating password"
        })
    }

}

export const verifyToken = async(req:Request,res:Response)=>{
        const { token } = req.params;   
       try{
        const tokenEntry = await prismaClient.forgetpassword.findUnique({
            where: { token },
          });
          if (tokenEntry) {
            res.json({ valid: true });
            return 
          } else {
             res.json({ valid: false });
             return
          }
       }
       catch(e){
        res.json({
            valid:false
        })
       }
    
}