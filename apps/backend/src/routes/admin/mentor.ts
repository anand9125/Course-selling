import { Router } from "express";
import { adminAuthMiddleware } from "../../Middlewares/adminMiddlewares";
import { createMentor, deleteMentor, selectedMentor, updateMentor } from "../../controller/mentorController";

const router =  Router();


router.post("/create",adminAuthMiddleware,createMentor)


router.put("/update/:mentorId", adminAuthMiddleware, updateMentor)

router.delete("/delete/:mentorId", adminAuthMiddleware, deleteMentor)

router.put("/selectedMentor",adminAuthMiddleware,selectedMentor)









export const  adminMentorRouter = router