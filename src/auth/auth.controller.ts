import { NextFunction, Request, Response } from "express";
import AuthService from "./auth.service";
import jwt from "jsonwebtoken";
import debug, { IDebugger } from "debug";
import { Password } from "../common/services/password";
import { checkValidRequestSignUp } from "../utils/checkRequests";

const jwtSecret: string = process.env.JWT_SECRET || "123456";
const tokenExpirationInSeconds = 36000;

const log: IDebugger = debug("auth:controller");

class AuthController {
  constructor() {}

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const email: string = req.body.email;
      const password: string = req.body.password;

      const user = await AuthService.findUserByEmail(email);

      log("user", user);
      if (user) {
        const isPasswordMatch = await Password.compare(user.password, password);

        console.log(isPasswordMatch);

        if (!isPasswordMatch) {
          return res.status(400).json({
            success: false,
            message: "Invalid credentials",
          });
        } else {
          log("jwt Secret", jwtSecret);

          req.body.isAdmin = user.isAdmin;
          const token = jwt.sign(req.body, jwtSecret, {
            expiresIn: tokenExpirationInSeconds,
          });

          return res.status(200).json({
            success: true,
            data: user,
            token,
          });
        }
      } else {
        log("User Not Found");

        return res.status(404).json({
          message: "User Not Found",
        });
      }
    } catch (e) {
      next(e);
    }
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const isValidRequest = checkValidRequestSignUp(req);

      if (!isValidRequest) {
        return res.status(400).send({
          message: "Bad Request",
        });
      }
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const country = req.body.country;
      const dob = new Date(req.body.dob);
      const createdAt = new Date(req.body.createdAt);
      const updatedAt = new Date(req.body.updatedAt);
      const referredBy = req.body.referredBy;
      const mfa = req.body.mfa;
      const isAdmin = false;

      const user = await AuthService.findUserByEmail(email);
      log("user", user);
      if (user) {
        return res.status(409).json({
          success: false,
          message: "User already exists",
        });
      } else {
        try {
          const newUser = await AuthService.createUser({
            username,
            email,
            password,
            firstName,
            lastName,
            country,
            dob,
            createdAt,
            updatedAt,
            referredBy,
            mfa,
            isAdmin,
          });

          const token = jwt.sign({ username, password }, jwtSecret, {
            expiresIn: tokenExpirationInSeconds,
          });

          return res.status(200).json({
            success: true,
            data: newUser,
            token,
          });
        } catch (e) {
          log("Controller capturing error", e);
          throw new Error("Error while register");
        }
      }
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
