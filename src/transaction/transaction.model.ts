import MongooseService from "../common/services/mongoose.services";
import { model, Schema, Model, Document } from "mongoose";
import { scrypt } from "crypto";
import { promisify } from "util";
import { ITransaction } from "./transaction.interface";

const scryptAsync = promisify(scrypt);
export interface TransactionDocument extends Document {
  userEmail: string;
  amount: number;
  type: string;
  createdAt: Date;
}

interface TransactionModel extends Model<TransactionDocument> {
  build(attrs: ITransaction): TransactionDocument;
}

const TransactionSchema: Schema = new Schema(
  {
    userEmail: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    createdAt: { type: Date, required: true },
  },
  {
    toObject: {
      transform: function (doc, ret) {},
    },
    toJSON: {
      transform: function (doc, ret) {},
    },
  }
);

TransactionSchema.statics.build = (attrs: ITransaction) => {
  return new Transaction(attrs);
};

const Transaction = MongooseService.getInstance().model<
  TransactionDocument,
  TransactionModel
>("Transaction", TransactionSchema);

export default Transaction;
