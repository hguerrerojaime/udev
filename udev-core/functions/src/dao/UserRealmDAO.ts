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

  findAllUserRealms(userId) {
    return this.collection().where("userId","==",userId);
  }

  findAllRealmUsers(realmId) {
    return this.collection().where("realmId","==",realmId);
  }

  findByRealmAndUser(realmId,userId) {
    return this.collection().where("userId","==",userId).where("realmId","==",realmId).limit(1);
  }

}
