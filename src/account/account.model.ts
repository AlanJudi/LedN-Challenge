import MongooseService from "../common/services/mongoose.services";
import { model, Schema, Model, Document } from "mongoose";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { IUser } from "./account.interface";
import { Password } from "../common/services/password";

const scryptAsync = promisify(scrypt);
export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  dob: Date;
  mfa: string;
  createdAt: Date;
  updatedAt: Date;
  referredBy: string;
  password: string;
  username: string;
  isAdmin: boolean;
}

interface UserModel extends Model<UserDocument> {
  build(attrs: IUser): UserDocument;
}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    mfa: { type: String, required: false },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    referredBy: { type: String, required: false },
    password: { type: String, required: true },
    username: { type: String, required: true },
    isAdmin: { type: Boolean, required: false },
  },
  {
    toObject: {
      transform: function (doc, ret) {},
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
  }
);

UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

UserSchema.statics.build = (attrs: IUser) => {
  return new User(attrs);
};

const User = MongooseService.getInstance().model<UserDocument, UserModel>(
  "User",
  UserSchema
);

export default User;
