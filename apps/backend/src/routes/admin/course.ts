import { Router } from "express";
import { adminAuthMiddleware } from "../../Middlewares/adminMiddlewares";
import { createCourses, deleteCourseById, updateCourseById } from "../../controller/coursesController";

const router =  Router()


router.post("/create",adminAuthMiddleware,createCourses)

router.put("/update/:courseId",adminAuthMiddleware,updateCourseById)
 
router.delete("/delete-Course/:courseId",adminAuthMiddleware,deleteCourseById)








export const adminCoursesRouter = router