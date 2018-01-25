import { injectable, inject } from "inversify";

import { AccessLevel } from '../core/AccessLevel';

@injectable()
export default class RealmService {

  public constructor(
    @inject("realmDAO") private realmDAO,
    @inject("userService") private userService,
    @inject("userRealmDAO") private userRealmDAO,
    @inject("regionDAOFactory") private regionDAOFactory
  ) { }

  async register(command) {
    const ref = await this.realmDAO.addRealm({
      currentAccount: command.currentAccount,
      name: command.name,
      description: command.description
    });

    await this.assignUserToNewRealm(ref.id,command.currentAccount);
    const regionDAO = this.regionDAOFactory(ref.id);

    await regionDAO.addRegion({
      name: "development",
      description: "Development Sandbox",
      currentAccount: command.currentAccount
    });

    return ref.id;
  }

  private async assignUserToNewRealm(realmId,currentAccount) {

    const user = await this.userService.getUserByAccountId(currentAccount);

    return await this.userRealmDAO.addUserToRealm({
      currentAccount: currentAccount,
      userId: user.id,
      realmId: realmId,
      accessLevel: AccessLevel.OWNER
    });

  }

  async exists(id) {
    const doc = await this.realmDAO.find(id);
    return doc.exists;
  }

  async get(id) {
    const doc = await this.realmDAO.find(id);
    if (doc.exists) {
      return doc.data();
    }
  }

}
