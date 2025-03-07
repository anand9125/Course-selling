import { Router } from "express";
import {  paymentController,paymentStatusController} from "../../controller/paymentController"


const router = Router();

router.post("/pay", paymentController)



 router.post("/status" ,paymentStatusController)


export const paymentRouter = router