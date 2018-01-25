import DAO from './DAO';

export default class UserRealmDAO extends DAO {


  find(id) {
    return this.collection().doc(id);
  }

  collection() {
    return this.parentRef().collection("userRealm");
  }

  addUserToRealm(command) {
    return this.add(this.collection(),command.currentAccount,{
      userId: command.userId,
      realmId: command.realmId,
      accessLevel: command.accessLevel
    });
  }

  findUserRealms(userId) {
    return this.collection().where("userId","==",userId);
  }

  findRealmUsers(realmId) {
    return this.collection().where("realmId","==",realmId);
  }

}
