import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

const USERNAME = "anand9125";
const PASSWORD = "password";

export const phonePeMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
     res.status(401).send("Unauthorized: Missing Authorization header");
     return
    }
    try {
        const hashedAuth = crypto.createHash("sha256").update(`${USERNAME}:${PASSWORD}`).digest("hex");

        if(authHeader !== `SHA256(${hashedAuth})`) {
          res.status(401).send("Unauthorized: Invalid credentials");
          return
        }
        next();
    } catch (e) {
        console.error("Error in authentication middleware:", e);
         res.status(500).send("Internal Server Error");
    }
};



// crypto.createHash('sha256') → Creates a SHA-256 hash instance.
// .update(data) → Updates the hash with the input string.
// .digest('hex') → Outputs the hash in hexadecimal format.