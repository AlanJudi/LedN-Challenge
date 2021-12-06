import { RouteConfig } from "../common/common.route.config";
import express, { Application, Request, Response } from "express";
import UserController from "./account.controller";
import JWT from "../middleware/JWT";

export class UserRoutes extends RouteConfig {
  constructor(app: Application, API_VERSION: string) {
    super(app, "UserRoutes", API_VERSION);
  }
  configureRoutes() {
    const baseRoute: string = `/api/${this.API_VERSION}`;
    this.app
      .route(`${baseRoute}/accounts`)
      .get(JWT.authenticateAdmin, [UserController.getAccounts]);
    this.app
      .route(`${baseRoute}/accounts/:id`)
      .get(JWT.authenticateAdmin, [UserController.getAccount]);
    this.app
      .route(`${baseRoute}/accounts/:id`)
      .put(JWT.authenticateAdmin, [UserController.updateAccount]);

    this.app
      .route(`${baseRoute}/accounts/:id/account_balance`)
      .get(JWT.authenticateAdmin, [UserController.getBalance]);
    return this.app;
  }
}
