import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import debug, { IDebugger } from "debug";
import { IUser } from "../account/account.interface";
import AuthService from "../auth/auth.service";

const log: IDebugger = debug("middleware:JWT");
const JWT_KEY = process.env.JWT_SECRET || "123456";

class JWT {
  authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader !== "null") {
      log("auth Header", JWT_KEY);
      jwt.verify(authHeader.split(" ")[1], JWT_KEY, (err: any, user: any) => {
        if (err) {
          log("Error", err);
          console.log(err);
          return res.status(403).send({
            success: false,
            message: "Token Expired or invalid token",
          });
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({ success: false, message: "UnAuthorized" });
    }
  }

  authenticateAdmin(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader !== "null") {
      log("auth Header", JWT_KEY);
      jwt.verify(authHeader.split(" ")[1], JWT_KEY, (err: any, user: any) => {
        if (err) {
          log("Error", err);
          console.log(err);
          return res.status(403).send({
            success: false,
            message: "Token Expired or invalid token",
          });
        }

        if (user.isAdmin) {
          req.user = user;
          next();
        } else {
          return res
            .status(403)
            .json({ success: false, message: "Forbidden resource" });
        }
      });
    } else {
      res.status(401).json({ success: false, message: "UnAuthorized" });
    }
  }
}

export default new JWT();
