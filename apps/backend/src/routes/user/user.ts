import { Router } from "express";
import {sendForgetPassowordmail, rediretForgetPasswordPage, postEmail, removeBalance, resetPassword, userSignIn, userSignUp, verifyRefrellCode, walletBalance, verifyToken } from "../../controller/userController";



const router = Router();


router.post("/signup",userSignUp);

router.post("/signin",userSignIn);

router.get("/wallet/:userId",walletBalance)

router.post("/verify/referralCode",verifyRefrellCode)

router.post("/removeBalance/:userId",removeBalance)

router.post("/postEmail",postEmail)

router.post("/forget-password",sendForgetPassowordmail)

router.get("/access-forgetPasswordPage",rediretForgetPasswordPage)

router.post("/reset-password",resetPassword)

router.get("/verify-token/:token",verifyToken)




export const userRouter = router