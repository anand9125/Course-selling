import { Router } from "express";
import { paymentController } from "../../controller/paymentController";


const router = Router();

router.post("/pay", paymentController)












export const paymentRouter = router