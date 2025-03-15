import { Router } from "express";
import { userSignIn, userSignUp, verifyRefrellCode, walletBalance } from "../../controller/userController";



const router = Router();


router.post("/signup",userSignUp);

router.post("/signin",userSignIn);

router.get("/wallet/:userId",walletBalance)

router.post("/verify/referralCode",verifyRefrellCode)





export const userRouter = router