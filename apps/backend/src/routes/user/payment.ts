import { Router } from "express";
import { paymentinitationController,paymentStatusController} from "../../controller/phonepe"


const router = Router();

router.post("/pay", paymentinitationController)


router.get("/status",paymentStatusController )


export const paymentRouter = router