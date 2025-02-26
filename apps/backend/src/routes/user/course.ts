import { Router } from "express";
import { getAllCourses,  getCourseOfSelectedMentor,  getCoursesByCategoryid, getCoursesByCategoryidMentorid, getCoursesByMentorid, getSingleCourse } from "../../controller/coursesController";


const router = Router();


router.get("/",getAllCourses)

router.get("/:courseId",getSingleCourse)

router.get("/category/:categoryId",  getCoursesByCategoryid);

router.get("/mentor/:mentorId", getCoursesByMentorid);

router.get("/getCourse/:categoryId/:mentorId",getCoursesByCategoryidMentorid);

router.get("/getCourseByMentorId/selected-mentor",getCourseOfSelectedMentor)

export const courseRouter = router