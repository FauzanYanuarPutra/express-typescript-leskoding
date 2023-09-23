import { Request, Response, NextFunction } from "express";


export const auth = (req: Request, res: Response, next: NextFunction) => {
  let auth = true;

  if (!auth) {
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