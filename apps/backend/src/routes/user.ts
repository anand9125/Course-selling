import { Router } from "express";
import {PrismaClient } from "@prisma/client";
import { userSignIn, userSignUp } from "../controller/userController";


const router = Router();
const client = new PrismaClient();

router.post("/signup",userSignUp);

router.post("/signin",userSignIn);




export const userRouter = router