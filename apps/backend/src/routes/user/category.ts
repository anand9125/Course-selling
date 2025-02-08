import { Router } from "express";
import { getAllCategories, getSingleCategory } from "../../controller/categoryController";

const router = Router();


router.get("/",getAllCategories)

router.get("/:categoryId",getSingleCategory)


export const categoryRouter =router