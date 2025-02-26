import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { adminPassword } from "../types/config";

interface AuthenticatedRequest extends Request {
  id?: string; 
}

export function adminAuthMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  console.log("some one is higiing me")
  const token = req.headers.authorization;
   console.log(token)
  if (!token) {
    res.status(401).json({ message: "Token required" });
    return; 
  }

  try {
    console.log("hii")
    const payload = jwt.verify(token, adminPassword) as { userId: string }; 
   
   req.id = payload.userId 
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}