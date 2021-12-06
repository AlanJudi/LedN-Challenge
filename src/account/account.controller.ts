import { Request, Response, NextFunction } from "express";
import * as AccountService from "./account.service";
import { IUser } from "./account.interface";
import {
  checkValidRequestNewUser,
  checkValidRequest,
} from "../utils/checkRequests";
import AuthService from "../auth/auth.service";

class AccountController {
  constructor() {}
  async getAccounts(req: Request, res: Response, next: NextFunction) {
    try {
      const accounts: IUser[] = await AccountService.findAll();

      return res.status(200).send(accounts);
    } catch (e: any) {
      return res.status(500).send(e.message);
    }
  }

  async getAccount(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params.id;

    try {
      const account: IUser | null = await AccountService.find(id);

      if (account) {
        return res.status(200).send(account);
      }

      return res.status(404).send("account not found");
    } catch (e: any) {
      res.status(500).send(e.message);
    }

    next();
  }

  async getBalance(req: Request, res: Response, next: NextFunction) {
    const email: string = req.params.id;

    const existingAccount: IUser | null = await AccountService.find(email);

    if (existingAccount) {
      const balance: number = await AccountService.getBalance(email);
      res.status(200).json({
        success: true,
        account: existingAccount.email,
        balance: balance,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }
  }

  async updateAccount(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params.id;
    req.body.email = id;

    try {
      const isValidRequest: boolean = checkValidRequest(req);

      if (!isValidRequest) {
        return res.status(400).json({ success: false, message: "Bad request" });
      }
      const accountUpdate = { ...req.body };

      const existingAccount: IUser | null = await AccountService.find(id);

      if (existingAccount) {
        const updatedAccount = await AccountService.updateAccount(
          id,
          accountUpdate
        );
        return res
          .status(200)
          .json({ success: true, action: "updated", info: updatedAccount });
      } else {
        const isValidNewUser: boolean = checkValidRequestNewUser(req);

        if (!isValidNewUser) {
          return res
            .status(400)
            .json({ success: false, message: "Bad request" });
        }

        const user: IUser = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          createdAt: new Date(),
          updatedAt: new Date(),
          dob: new Date(req.body.dob),
          password: req.body.password,
          isAdmin: false,
          username: req.body.username,
          country: req.body.country,
        };

        AuthService.createUser(user);

        res.status(200).json({
          success: true,
          action: "created",
          user: user,
        });
      }
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
}
export default new AccountController();
