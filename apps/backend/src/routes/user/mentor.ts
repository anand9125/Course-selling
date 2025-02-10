import { Router } from "express";
import { getAllMentor, getSingleMentor,getCategroyMentor } from "../../controller/mentorController";


const router = Router();



router.get("/",getAllMentor);

router.get("/:mentorId",getSingleMentor)

router.get("/category/:categoryId",getCategroyMentor);





export const mentorRouter = router