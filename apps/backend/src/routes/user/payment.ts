import { Router } from "express";
import { paymentCallBackController, paymentController, paymentStatusController } from "../../controller/paymentController";


const router = Router();

router.post("/pay", paymentController)

router.post("/payment/callback",paymentCallBackController)

router.get("/payment/status/:transactionId" ,paymentStatusController)












export const paymentRouter = router