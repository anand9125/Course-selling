import { Router } from "express";
import { getAllCategories, getCategoryByMentorId, getSingleCategory } from "../../controller/categoryController";

const router = Router();


router.get("/",getAllCategories)

router.get("/:categoryId",getSingleCategory)

router.get("/mentor/:mentorId",getCategoryByMentorId)


export const categoryRouter =router