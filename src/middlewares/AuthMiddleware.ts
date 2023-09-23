import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if(!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  } 

  const secretKey = process.env.SECRET_KEY || "secret";
  const token: string = req.headers.authorization.split(" ")[1];

  try {
    const credentials: string | object = jwt.verify(token, secretKey);
    req.app.locals.credentials = credentials;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
} 


// export const auths = (req: Request, res: Response, next: NextFunction) => {
//   let auth = true;

//   if (!auth) {
//     return res.status(401).json({ message: "Unauthorized versi ke 2" });
//   }

//   next();
// } 