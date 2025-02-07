import { Router } from "express";
import { getAllCourses,  getCoursesByCategoryId, getCoursesByMentor, getSingleCourse } from "../../controller/coursesController";


const router = Router();


router.get("/",getAllCourses)

router.get("/:courseId",getSingleCourse)

router.get("/category/:categoryId",  getCoursesByCategoryId);

router.get("/mentor/:mentorId", getCoursesByMentor);

export const courseRouter = router