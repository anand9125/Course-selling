import { Router } from "express";
import {  paymentController,paymentStatusController} from "../../controller/phonepe"


const router = Router();

router.post("/pay", paymentController)


router.get("/status",paymentStatusController )


export const paymentRouter = router