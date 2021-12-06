import { Application, Request, Response } from "express";
import { RouteConfig } from "../common/common.route.config";
import AuthController from "./auth.controller";

export class AuthRoutes extends RouteConfig {
  constructor(app: Application, API_VERSION: string) {
    super(app, "AuthRoutes", API_VERSION);
  }
  configureRoutes() {
    this.app.route(`/api/${this.API_VERSION}/login`).post(AuthController.login);
    this.app
      .route(`/api/${this.API_VERSION}/signup`)
      .post(AuthController.signup);
    return this.app;
  }
}
