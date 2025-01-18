import { json, Request,Response } from "express"
import { PrismaClient } from "@prisma/client";
import { io } from "../lib/socket.io/socket";
const client =new PrismaClient()
import cloudinary from "../lib/cloudnary";
import { getReciverSocketId } from "../lib/socket.io/socket";
export const getUserForSidebar = async (req: Request, res: Response) => {
    try {
      const loggedUserId = req.userId;
  
      // Fetch all users except the logged-in user
      const filteredUsers = await client.user.findMany({
        where: {
          id: {
            not: loggedUserId, // Exclude the logged-in user
          },
        },
        select: {
                id: true,
                username: true,
                fullName: true,
                password: true,
                profilePic: true,
                createdAt: true,
                updatedAt: true,
                sentMessages: true,
                receivedMessages: true
        },
      });
  
      if (filteredUsers.length === 0) {
         res.status(404).json({ message: 'No users found' });
      }
  
      res.status(200).json(filteredUsers); // Send filtered users as the response
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({
        message: 'Something went wrong, please try again later.',
      });
    }
  };
  

export const getMessage=async(req:Request,res:Response)=>{
  console.log("i am here in message")
  try{
     const userToChatId=req.params.id
     const senderId = req.userId
     console.log(senderId)
     console.log(userToChatId)
     const message = await client.message.findMany({
        where: {
            OR: [
              {
                senderId: senderId, // Assuming `senderId` is the correct field for `from`
                receiverId: userToChatId, // Assuming `receiverId` is the correct field for `to`
              },
              {
                senderId: userToChatId,
                receiverId: senderId,
              }
            ]
          }
     })
     console.log(message)
     res.status(200).json(message);
   }
   catch(e){
    res.status(500).json({
        message:"Internal Server Error"
    })

   }
}

export const sentMessage = async(req:Request,res:Response)=>{
  
   try{ 
    const {text,image}= req.body;
    const recieverId = req.params.id;
    const senderId = req.userId;
    let imageUrl ;
    if(image){
        const uploadResponse = await cloudinary.uploader.upload(image)
        imageUrl = uploadResponse.secure_url
    }
   
    const newMessage = await client.message.create({
        data:{
            text,
            image:imageUrl,
            senderId,
            receiverId:(recieverId)
        }
    })
   
    const recieverSocketId=getReciverSocketId(recieverId)
    if(recieverSocketId){
      io.to(recieverSocketId).emit("newMessage", newMessage)
    }

    res.status(201).json(newMessage)
    console.log(newMessage)
   }
   catch(e){
    res.status(500).json({
        message:"Internal Server Error"
    })
   }

}