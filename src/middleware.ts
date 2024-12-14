import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
const JWT_PASSWORD = "kalpesh"



export function userMiddleware(req: Request, res: Response, next: NextFunction){
    const token= req.headers["authorization"];
    const decoded = jwt.verify(token as string, JWT_PASSWORD);

    if(decoded){
        //@ts-ignore
        req.userId = decoded.id;
        next();

    } else {
        res.status(403).json({
            message: "you are not logged in"
        })
    }
}