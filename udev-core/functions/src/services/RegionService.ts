import { injectable, inject } from "inversify";
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { AccessLevel } from '../core/AccessLevel';

@injectable()
export default class RegionService {

  public constructor(
    @inject("regionDAOFactory") private regionDAOFactory,
    @inject("userRegionDAOFactory") private userRegionDAOFactory,
    @inject("realmService") private realmService,
    @inject("userService") private userService
  ) { }

  async create(realmId,command) {

    const regionDAO = this.regionDAOFactory(realmId);

    const ref = await regionDAO.addRegion({
      currentAccount: command.currentAccount,
      name: command.name,
      description: command.description,
      access: command.access
    });

    return ref.id;

  }

  async findAllVisibleRegions(realmId,accountId) {
    await this.verifyRealmAccessByAccount(realmId,accountId);

    const regionDAO = this.regionDAOFactory(realmId);
    const visibleRegions = await regionDAO.findAllVisibleRegions().get();
    return visibleRegions.docs;
  }

  async findAllUserRegionsByAccountId(realmId,accountId) {
    const user = await this.userService.getUserByAccountId(accountId);
    return this.findAllUserRegions(realmId,user.id);
  }

  async findAllRegionsByAccountId(realmId,accountId) {
    return [].concat(
      await this.findAllVisibleRegions(realmId,accountId),
      await this.findAllUserRegionsByAccountId(realmId,accountId)
    );
  }

  async get(realmId,accountId,id) {
    await this.verifyRealmAccessByAccount(realmId,accountId);

    const regionDAO = this.regionDAOFactory(realmId);
    const ref = regionDAO.find(id);
    const doc = await ref.get();

    if (doc.exists) {
      return doc.data();
    }
  }

  async canReadRegion(realmId,regionId,accountId) {
    const regionDAO = this.regionDAOFactory(realmId);
    const user = await this.userService.getUserByAccountId(accountId);
    return await regionDAO.canDoWithRegion(regionId,user.id,AccessLevel.READ);
  }

  async canWriteRegion(realmId,regionId,accountId) {
    const regionDAO = this.regionDAOFactory(realmId);
    const user = await this.userService.getUserByAccountId(accountId);
    return await regionDAO.canDoWithRegion(regionId,user.id,AccessLevel.WRITE);
  }

  async canAdminRegion(realmId,regionId,accountId) {
    const regionDAO = this.regionDAOFactory(realmId);
    const user = await this.userService.getUserByAccountId(accountId);
    return await regionDAO.canDoWithRegion(regionId,user.id,AccessLevel.ADMIN);
  }

  async canOwnRegion(realmId,regionId,accountId) {
    const regionDAO = this.regionDAOFactory(realmId);
    const user = await this.userService.getUserByAccountId(accountId);
    return await regionDAO.canDoWithRegion(regionId,user.id,AccessLevel.OWNER);
  }

  private async findAllUserRegions(realmId,userId) {
    await this.verifyRealmAccessByUser(realmId,userId);

    const userRegionDAO = this.userRegionDAOFactory(realmId);
    const regionDAO = this.regionDAOFactory(realmId);
    const userRegionRef = userRegionDAO.findUserRegions(userId);
    const userRegionIdList = await userRegionRef.get();
    const regionIds = userRegionIdList.docs.map((doc) => doc.data().regionId );
    const userRegions = await regionDAO.findMany(regionDAO.collection(),regionIds);
    return userRegions;
  }

  private async verifyRealmAccessByAccount(realmId,accountId) {
    if (!await this.realmService.isRealmVisibleToAccount(realmId,accountId)) {
      throw new ResourceNotFoundError();
    }
  }

  private async verifyRealmAccessByUser(realmId,userId) {
    if (!await this.realmService.isRealmVisibleToUser(realmId,userId)) {
      throw new ResourceNotFoundError();
    }
  }

}
