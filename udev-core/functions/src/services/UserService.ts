import { injectable, inject } from "inversify";

@injectable()
export default class UserService {

  public constructor(
    @inject("userDAO") private userDAO
  ) { }

  async register(command) {

    const account = await this.userDAO.findAccountByEmail(command.email);

    if (account) {
      return account.id;
    }

    const ref = await this.userDAO.addUser({ currentAccount: command.currentAccount });

    await this.userDAO.addAccount({
      userId: ref.id,
      email: command.email,
      currentAccount: command.currentAccount
    });
    return ref.id;
  }

  getUser(id) {
    return this.userDAO.find(id);
  }

  async getUserByAccountId(id) {
    const account = await this.getAccount(id).get();
    if (account.exists) {
      return this.getUser(account.data().userId);
    }
  }

  getAccount(id) {
    return this.userDAO.findAccount(id);
  }

}
