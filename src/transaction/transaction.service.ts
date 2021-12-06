import Transaction from "../transaction/transaction.model";
import { ITransaction } from "../transaction/transaction.interface";

class TransactionService {
  async createTransaction(data: ITransaction) {
    try {
      const transaction = Transaction.build(data);
      await transaction.save();
    } catch (e: any) {
      throw new Error(e);
    }
  }
  async findTransactionByEmail(email: string) {
    return Transaction.findOne({
      email: email,
    }).exec();
  }

  async findAll() {
    return Transaction.find().exec();
  }
}
export default new TransactionService();
