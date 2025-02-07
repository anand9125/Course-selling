import { Router } from "express";

import { userSignIn, userSignUp } from "../../controller/userController";


const router = Router();


router.post("/signup",userSignUp);

router.post("/signin",userSignIn);





export const userRouter = router