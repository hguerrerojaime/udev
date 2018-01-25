import { injectable, inject } from "inversify";

@injectable()
export default class UserService {

  public constructor(
    @inject("userDAO") private userDAO,
    @inject("userRealmDAO") private userRealmDAO,
    @inject("realmDAO") private realmDAO,
    @inject("userRegionDAOFactory") private userRegionDAOFactory,
    @inject("regionDAOFactory") private regionDAOFactory
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

  async findUserRealms(id) {
    const userRealmRef = this.userRealmDAO.findUserRealms(id);
    const userRealmIdList = await userRealmRef.get();
    const realmIds = userRealmIdList.docs.map((doc) => doc.data().realmId );
    console.log(this.realmDAO);
    console.log(this.realmDAO.collection);
    return this.realmDAO.collection().in("id",realmIds);
  }

  async findUserRealmsByAccountId(id) {
    const user = await this.getUserByAccountId(id);
    return this.findUserRealms(user.id);
  }

  async findUserRegions(id,realmId) {
    const userRegionDAO = this.userRegionDAOFactory(realmId);
    const regionDAO = this.regionDAOFactory(realmId);
    const userRegionRef = userRegionDAO.findUserRegions(id);
    const userRegionIdList = await userRegionRef.get();
    const regionIds = userRegionIdList.map((doc) => doc.data().regionId );
    return regionDAO.collection().in("id",regionIds);
  }

  async findUserRegionsByAccountId(id,realmId) {
    const user = await this.getUserByAccountId(id);
    return this.findUserRegions(user.id,realmId);
  }

}
