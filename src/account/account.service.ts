/**
 * Data Model Interfaces
 */

import { BaseAccount, IUser } from "../account/account.interface";
import User from "../account/account.model";
import Transaction from "../transaction/transaction.model";
import { ITransaction } from "../transaction/transaction.interface";

/*** Service Methods */

export const findAll = async (): Promise<IUser[]> => {
  return await User.find();
};

export const find = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email: email }).exec();
};

export const create = async (newAccount: IUser): Promise<IUser> => {
  try {
    const user = User.build(newAccount);
    return await user.save();
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateAccount = async (
  email: string,
  accountUpdate: any
): Promise<IUser | null> => {
  const filter = { email: email };
  return await User.findOneAndUpdate(filter, accountUpdate);
};

export const getBalance = async (email: string): Promise<number> => {
  let balance: number = 0;

  const transactions = await Transaction.find({ userEmail: email });

  transactions.forEach((transaction: ITransaction, index: number) => {
    if (transaction.type == "receive") {
      balance += transaction.amount;
    } else {
      balance -= transaction.amount;
    }
  });

  return balance;
};
