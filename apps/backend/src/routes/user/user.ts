import { Router } from "express";
import { postEmail, removeBalance, userSignIn, userSignUp, verifyRefrellCode, walletBalance } from "../../controller/userController";



const router = Router();


router.post("/signup",userSignUp);

router.post("/signin",userSignIn);

router.get("/wallet/:userId",walletBalance)

router.post("/verify/referralCode",verifyRefrellCode)

router.post("/removeBalance/:userId",removeBalance)

router.post("/postEmail",postEmail)




export const userRouter = router