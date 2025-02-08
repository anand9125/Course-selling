import { Router } from "express";
import { createCategory, deleteCategory, updateCategory, updateCategoryIndex } from "../../controller/categoryController";
import { adminAuthMiddleware } from "../../Middlewares/adminMiddlewares";

const router =  Router();

router.post("/create-category",adminAuthMiddleware, createCategory);

router.put("/update/:categoryId",adminAuthMiddleware,updateCategory);

router.delete("/delete/:categoryId",adminAuthMiddleware,deleteCategory);

router.put("/update/:categoryId",adminAuthMiddleware,updateCategoryIndex);



export const  adminCategoryRouter=router