import { Request, Response, NextFunction } from 'express';
import { JWT_PASSWORD } from "../config";
import jwt from "jsonwebtoken";
import Cookies from 'js-cookie';
declare global {
    namespace Express {
        export interface Request {
            userId: string;
        }
    }
}
declare module 'express-session' {
    interface Session {
      jwt?: string; // Add the jwt property to the session
    }
  }

export const userMiddleware = (req: Request, res: Response, next: NextFunction): void => {
     const token = req.headers.authorization;
    
   console.log("hii i am from profiel pic reuesrt")
    if (!token) {
        res.status(403).json({ message: "Unauthorized" });
        return; 
    }
    try {
        const decoded = jwt.verify(token, JWT_PASSWORD) as { userId: string };   
        if (!decoded) {
            res.status(403).json({ message: "Unauthorized - Invalid token" });
            return; 
        } 
       console.log( decoded.userId)
      req.userId = decoded.userId;
      next();
    } catch (err) {
        res.status(403).json({ message: "Unauthorized - Token invalid" });
        return; 
    }
};
