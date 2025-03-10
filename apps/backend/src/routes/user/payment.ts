import { Router } from "express";
import {  paymentController} from "../../controller/phonepe"


const router = Router();

router.post("/pay", paymentController)


  router.post("/status" )


export const paymentRouter = router