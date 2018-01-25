import DAO from './DAO';

export default class UserDAO extends DAO {


  find(id) {
    return this.collection().doc(id);
  }

  findAccount(id) {
    return this.accountCollection().doc(id);
  }

  async findAccountByEmail(email) {
    return await this.findOne(this.accountCollection().where("email","==",email));
  }

  collection() {
    return this.parentRef().collection("user");
  }

  accountCollection() {
    return this.parentRef().collection("userAccount");
  }

  addUser(command) {
    return this.add(this.collection(),command.currentAccount);
  }

  addAccount(command) {
    return this.set(
      this.accountCollection().doc(command.currentAccount),
      command.currentAccount,
      { userId: command.userId, email: command.email }
    );
  }

}
