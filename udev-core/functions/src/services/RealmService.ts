import { injectable, inject } from "inversify";

import { AccessLevel } from '../core/AccessLevel';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

@injectable()
export default class RealmService {

  public constructor(
    @inject("db") private db,
    @inject("realmDAO") private realmDAO,
    @inject("userService") private userService,
    @inject("userRealmDAO") private userRealmDAO,
    @inject("regionServiceFactory") private regionServiceFactory
  ) { }

  register(command) {

    const $this = this;

    const regionService = regionServiceFactory();

    return this.db.runTransaction(async function(transaction) {

      const ref = await $this.realmDAO.addRealm({
        currentAccount: command.currentAccount,
        name: command.name,
        description: command.description,
        private: command.private
      },transaction);

      await $this.assignUserToNewRealm(ref.id,command.currentAccount,transaction);
      const regionDAO = $this.regionDAOFactory(ref.id);
      await regionDAO.addRegion({
        currentAccount: command.currentAccount,
        name: "development",
        description: "Development Sandbox"
      },transaction);

      return ref.id;

    });

  }

  private async assignUserToNewRealm(realmId,currentAccount,transaction = null) {

    const user = await this.userService.getUserByAccountId(currentAccount);

    return await this.userRealmDAO.addUserToRealm({
      currentAccount: currentAccount,
      userId: user.id,
      realmId: realmId,
      accessLevel: AccessLevel.OWNER
    },transaction);

  }

  async isRealmVisibleToUser(realmId,userId) {

    const realm = await this.realmDAO.find(realmId).get();

    //console.log(realm.data());

    if (realm.exists && !realm.data().private) {
      return true;
    }

    const query = await this.userRealmDAO.findByRealmAndUser(realmId,userId).get();
    return query.size > 0;
  }

  async isRealmVisibleToAccount(realmId,accountId) {
    const user = await this.userService.getUserByAccountId(accountId);
    return this.isRealmVisibleToUser(realmId,user.id);
  }

  findAllPublicRealms() {
    return this.realmDAO.findAllPublicRealms().get();
  }

  async findAllUserRealms(id) {
    const userRealmRef = this.userRealmDAO.findAllUserRealms(id);
    const userRealmIdList = await userRealmRef.get();
    const realmIds = userRealmIdList.docs.map((doc) => doc.data().realmId );
    return this.realmDAO.findMany(this.realmDAO.collection(),realmIds);
  }

  async findAllUserRealmsByAccountId(id) {
    const user = await this.userService.getUserByAccountId(id);
    return this.findAllUserRealms(user.id);
  }

  async findAllRealmsByAccountId(id) {
    const userRealmCollection = await this.findAllUserRealmsByAccountId(id);
    const publicRealmCollection = await this.findAllPublicRealms();

    const result = {
      user: {},
      public: {}
    };

    userRealmCollection.forEach(function(doc) {
      result.user[doc.id] = doc.data();
    });

    publicRealmCollection.forEach(function(doc) {
      result.public[doc.id] = doc.data();
    });

    return result;
  }

  async get(id,accountId) {

    const isVisible: boolean = await this.isRealmVisibleToAccount(id,accountId);
    const doc = await this.realmDAO.find(id);

    if (isVisible) {
      return doc.data();
    } else {
      throw new ResourceNotFoundError();
    }
  }



}
