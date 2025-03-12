import { Router } from "express";
import { phonePeMiddleware } from "../../Middlewares/phonePeMIddleware";
import { verifyPayment } from "../../controller/phonepe";

const router = Router();

router.post("/verify",phonePeMiddleware,verifyPayment)



export const verifyPaymentRouter =router