import { Request, Response, NextFunction } from "express";
import TransactionService from "./transaction.service";
import { ITransaction } from "./transaction.interface";
import fs from "fs";
import { checkValidTransactionRequest } from "../utils/checkRequests";

class TransactionController {
  constructor() {}
  async getAllTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const accounts: ITransaction[] = await TransactionService.findAll();

      return res.status(200).send(accounts);
    } catch (e: any) {
      return res.status(500).send(e.message);
    }
  }

  async postTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      if (!checkValidTransactionRequest(req)) {
        return res.status(400).json({
          success: false,
          message: "Bad request",
        });
      }
      const transaction: ITransaction = {
        type: req.body.type,
        amount: req.body.amount,
        userEmail: req.body.userEmail,
        createdAt: new Date(),
      };

      TransactionService.createTransaction(transaction);

      res.status(200).json({
        sucess: true,
        transaction: transaction,
      });
    } catch (error) {
      res.status(500).json({
        sucess: false,
        message: "Internal error occured",
      });
    }
  }
}
export default new TransactionController();
