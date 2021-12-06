import express, { Application } from "express";
export abstract class RouteConfig {
  app: Application;
  name: string;
  API_VERSION: string;
  constructor(app: Application, name: string, API_VERSION: string) {
    this.app = app;
    this.name = name;
    this.API_VERSION = API_VERSION;
    this.configureRoutes();
  }
  getName() {
    return this.name;
  }
  abstract configureRoutes(): Application;
}
