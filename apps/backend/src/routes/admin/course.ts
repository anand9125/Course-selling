import { Router } from "express";
import { adminAuthMiddleware } from "../../Middlewares/adminMiddlewares";
import { createCourses, deleteCourse, updateCourseIndex ,updateCourse} from "../../controller/coursesController";

const router =  Router()


router.post("/create",adminAuthMiddleware,createCourses)

router.put("/update/:courseId",adminAuthMiddleware,updateCourse)
 
router.delete("/delete/:courseId",adminAuthMiddleware,deleteCourse)

router.put("/updateIndex/:courseId",adminAuthMiddleware,updateCourseIndex)






export const adminCoursesRouter = router