import DAO from './DAO';

export default class UserRegionDAO extends DAO {

  constructor(
    db,
    recordAuditor,
    private realmDAO,
    private realmId
  ) {
    super(db,recordAuditor);
  }

  find(id) {
    return this.collection().doc(id);
  }

  collection() {
    return this.parentRef().collection("userRegion");
  }

  addUserToRegion(command) {
    return this.add(this.collection(),command.currentAccount,{
      userId: command.userId,
      regionId: command.realmId,
      accessLevel: command.accessLevel
    });
  }

  findUserRegions(userId) {
    return this.collection().where("userId","==",userId);
  }

  findRegionUsers(regionId) {
    return this.collection().where("regionId","==",regionId);
  }

  parentRef() {
    return this.realmDAO.find(this.realmId);
  }

}
