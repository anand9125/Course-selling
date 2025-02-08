import { Router } from "express";
import { getAllCourses,  getCoursesByCategoryid, getCoursesByMentorid, getSingleCourse } from "../../controller/coursesController";


const router = Router();


router.get("/",getAllCourses)

router.get("/:courseId",getSingleCourse)

router.get("/category/:categoryId",  getCoursesByCategoryid);

router.get("/mentor/:mentorId", getCoursesByMentorid);

export const courseRouter = router