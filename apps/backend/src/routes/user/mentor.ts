import { Router } from "express";
import { getAllMentor, getSingleMentor } from "../../controller/mentorController";


const router = Router();



router.get("/",getAllMentor);

router.get("/:mentorId",getSingleMentor)





export const mentorRouter = router