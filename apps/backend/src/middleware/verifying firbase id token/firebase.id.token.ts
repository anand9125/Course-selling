//verify the ID token(that provided by google authentication firebase) using Firebase Admin SDK
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
import { JWT_PASSWORD } from "../../config";
import { Request, Response } from "express";
import { firebase } from "../../config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import cloudinary from "../../lib/cloudnary";
import Cookies = require("js-cookie");
admin.initializeApp({
  credential: admin.credential.cert(firebase.serviceCredentical),
});

const client = new PrismaClient();

export const verifyToken = async (req: Request, res: Response) => {
  const idToken = req.body.idToken;
console.log("hii i am fro mbackend")
  try {
    // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(idToken); // Use verifyIdToken instead of verifyToken
        console.log("Decoded token:", decodedToken);
        console.log("User ID:", decodedToken.picture);
        console.log("hii i am fro mbackend")
       
        
        let uploadResponse;
                try {
                    // Upload to Cloudinary
                    uploadResponse = await cloudinary.uploader.upload(decodedToken.picture); 
                } catch (uploadError) {
                    console.error("Cloudinary Upload Error:", uploadError);
                    res.status(500).json({
                        message: "Failed to upload profile picture"
                    });
                    return;
                }
        // Create your own JWT token
        const token = jwt.sign(
        { userId: decodedToken.uid, username: decodedToken.email },
        JWT_PASSWORD,
        { expiresIn: "7d" }
        );
          Cookies.set('jwt', token);
        // Set cookie with your JWT
        res.cookie("jwt", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "none",
        secure: true, // Set to true for production
        });

        const existUser = await client.user.findFirst({
          where: {
            fullName: decodedToken.name,
          }
        })
        if(existUser){
          
          const token = jwt.sign(
          { userId: decodedToken.uid, username: decodedToken.email },
          JWT_PASSWORD,
          { expiresIn: "7d" }
          );
          res.status(200).json({
            id: existUser.id,
            fullName: existUser.fullName,
            username: existUser.username,
            profilePic: uploadResponse.secure_url ,
            createdAt: existUser.createdAt,
            updatedAt: existUser.updatedAt,
            token: token
          });return;
  
        }
        
        const hashedPassword = await bcrypt.hash(Math.random().toString(), 10);
        // Create a new user if they don't exist
        const user = await client.user.create({
        data: {
            id: decodedToken.uid,
            fullName: decodedToken.name,
            username: decodedToken.email,
            profilePic:  uploadResponse.secure_url,
            password: hashedPassword, // Password generated here should be handled more securely
            createdAt: new Date(),
        },
    });

    // Respond with success
        res.status(200).json({
          id: user.id,
          fullName: user.fullName,
          username: user.username,
          profilePic: user.profilePic,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          token: token
        });

  } catch (error) {
        console.error("Authentication failed:", error);
        res.status(401).send({ message: "Authentication failed", error });
  }
};
