import express from 'express';
import dotenv from 'dotenv';
import { JWT_PASSWORD } from './config';
import { authRoutes } from './routes/auth.route';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload'
import session from 'express-session';
import { app ,server} from './lib/socket.io/socket';
import { messageRoutes } from './routes/mesg.routes';

dotenv.config();
const cors = require('cors');
// In your CORS configuration
app.use(cors({
  origin: true,      // During development, accept all origins
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',  // This is crucial
}));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Add this before your routes
app.use(cookieParser());
app.use(express.json())

const port = 9000;

app.use("/api/v1",authRoutes)
app.use("/api/v1",messageRoutes)

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
