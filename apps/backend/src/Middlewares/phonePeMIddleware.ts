import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

const USERNAME = "anand_chau9125";
const PASSWORD = "Pramatma9936";

export const phonePeMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("Request Body:", req.body);
    console.log("Request Headers:", req.headers);

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        res.status(401).send("Unauthorized: Missing Authorization header");
        return
    }

    try {
        const hashedAuth = crypto.createHash("sha256").update(`${USERNAME}:${PASSWORD}`).digest("hex");

        const expectedAuthHeader = `${hashedAuth}`;     

        console.log("Expected Authorization Header:",expectedAuthHeader);

        if (authHeader !== expectedAuthHeader) {
             res.status(401).send("Unauthorized: Invalid credentials");
             return
        }

        next();
    } catch (error) {
        console.error("Error in authentication middleware:", error);
         res.status(500).send("Internal Server Error");
         return
    }
};



// crypto.createHash('sha256') → Creates a SHA-256 hash instance.
// .update(data) → Updates the hash with the input string.
// .digest('hex') → Outputs the hash in hexadecimal format.