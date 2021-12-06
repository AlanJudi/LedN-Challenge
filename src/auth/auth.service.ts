import User from "../account/account.model";
import { IUser } from "../account/account.interface";

class AuthService {
  async createUser(data: IUser) {
    try {
      const user = User.build(data);
      await user.save();
    } catch (e: any) {
      throw new Error(e);
    }
  }
  async findUserByEmail(email: string) {
    return User.findOne({
      email: email,
    }).exec();
  }
}
export default new AuthService();
