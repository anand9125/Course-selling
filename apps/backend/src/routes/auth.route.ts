import express from "express"
import { SignupSchema } from "../types";
export const authRoutes= express.Router();
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client";
import { checkAuth, signin } from "../controllers/auth.controller";
import { signup } from "../controllers/auth.controller";

import { userMiddleware } from "../middleware";
import {updateProfile } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifying firbase id token/firebase.id.token";
const client = new PrismaClient()


authRoutes.post("/signup",signup)

authRoutes.post("/signin",signin)



authRoutes.post("/authenticate",verifyToken)

authRoutes.put("/update-profile",userMiddleware,updateProfile)

authRoutes.get("/check",userMiddleware,checkAuth)