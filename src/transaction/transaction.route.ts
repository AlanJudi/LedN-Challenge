import { RouteConfig } from "../common/common.route.config";
import express, { Application, Request, Response } from "express";
import TransactionController from "./transaction.controller";
import JWT from "../middleware/JWT";

export class TransactionRoutes extends RouteConfig {
  constructor(app: Application, API_VERSION: string) {
    super(app, "UserRoutes", API_VERSION);
  }
  configureRoutes() {
    const baseRoute: string = `/api/${this.API_VERSION}`;
    this.app
      .route(`${baseRoute}/transactions`)
      .get(JWT.authenticateAdmin, [TransactionController.getAllTransactions]);
    this.app
      .route(`${baseRoute}/transactions`)
      .post(JWT.authenticateAdmin, [TransactionController.postTransaction]);
    return this.app;
  }
}
