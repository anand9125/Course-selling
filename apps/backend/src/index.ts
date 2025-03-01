import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/user/user';
import {adminCoursesRouter } from './routes/admin/course';
import { adminMentorRouter } from './routes/admin/mentor';
import { courseRouter } from './routes/user/course';
import { mentorRouter } from './routes/user/mentor';
import { categoryRouter } from './routes/user/category';
import { adminCategoryRouter } from './routes/admin/category';


const app = express();
const cors = require('cors');

dotenv.config();

app.use(cors());


app.use(express.json())


app.use("/api/v1/user",userRouter)

app.use("/api/v1/course",courseRouter)

app.use("/api/v1/mentor",mentorRouter)

app.use("/api/v1/category",categoryRouter)



app.use("/api/v1/admin/courses",adminCoursesRouter)

app.use("/api/v1/admin/mentor",adminMentorRouter)

app.use("/api/v1/admin/category",adminCategoryRouter)


app.listen(8080, () => console.log('Server started on port 8080'));