import { errorHandler } from "./middleware/exception.middleware";
import { notFoundHandler } from "./middleware/404.middleware";

import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

import { RouteConfig } from "./common/common.route.config";
import { UserRoutes } from "./account/account.route";
import { AuthRoutes } from "./auth/auth.route.config";
import { TransactionRoutes } from "./transaction/transaction.route";

const routes: Array<RouteConfig> = [];

/***  Application variables */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const API_VERSION = process.env.API_VERSION as string;
const app: Express = express();

/***  App Configuration */
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

/** Json Data */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routes.push(new UserRoutes(app, API_VERSION));
routes.push(new AuthRoutes(app, API_VERSION));
routes.push(new TransactionRoutes(app, API_VERSION));

/** Error handling */
app.use(errorHandler);
app.use(notFoundHandler);

/*** Server Activation */
const httpServer: http.Server = http.createServer(app);
httpServer.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
