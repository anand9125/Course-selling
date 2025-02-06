import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/user';


const app = express();
const cors = require('cors');

dotenv.config();

app.use(cors());


app.use(express.json())

const port = 9000;

app.use("/api/v1/user",userRouter)


app.listen(3000, () => console.log('Server started on port 3000'));