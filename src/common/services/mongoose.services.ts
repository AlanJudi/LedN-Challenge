import mongoose from "mongoose";
import debug, { IDebugger } from "debug";
const log: IDebugger = debug("app:mongoose-service");

class MongooseService {
  private count = 0;
  private mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    serverSelectionTimeoutMS: 5000,
    useFindAndModify: false,
  };
  constructor() {
    this.connectWithRetry();
  }
  getInstance() {
    return mongoose;
  }
  connectWithRetry() {
    const MONGODB_URI = process.env.MONGODB_URI || "";

    log("process.env.MONGODB_URI", process.env.MONGODB_URI);
    console.log(process.env.MONGODB_URI as string);

    log("Connecting to MongoDB(Retry when failed)");
    mongoose
      .connect(MONGODB_URI, this.mongooseOptions)
      .then(() => {
        log("MongoDB is connected");
        console.log("MongoDB is connected");
      })
      .catch((err) => {
        const retrySeconds = 5;
        log(
          `MongoDB connection unsuccessful (will retry #${++this
            .count} after ${retrySeconds} seconds):`,
          err
        );

        setTimeout(connectWithRetry, retrySeconds * 1000);
      });

    const connectWithRetry = () => {
      return mongoose.connect(MONGODB_URI, (err) => {
        if (err) {
          console.error(
            "Failed to connect to mongo on startup - retrying in 5 sec",
            err
          );
          setTimeout(connectWithRetry, 5000);
        }
      });
    };
  }
}
export default new MongooseService();
