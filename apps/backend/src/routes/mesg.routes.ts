import express from "express"
import { userMiddleware } from "../middleware";
import { getMessage, getUserForSidebar, sentMessage } from "../controllers/mesg.controller";
export const messageRoutes = express.Router();

messageRoutes.get("/users",userMiddleware,getUserForSidebar)
//get message between two user
messageRoutes.get("/messages/:id",userMiddleware,getMessage)

messageRoutes.post("/send/:id",userMiddleware,sentMessage)
