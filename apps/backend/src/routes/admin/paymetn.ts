import { Router } from "express";
import { phonePeMiddleware } from "../../Middlewares/phonePeMIddleware";
import {  webhookHandler } from "../../controller/phonepe";

const router = Router();

router.post("/webhook",phonePeMiddleware,webhookHandler)



export const verifyPaymentRouter =router