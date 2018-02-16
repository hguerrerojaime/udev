import DAO from './DAO';

import { VisibilityLevel } from '../core/VisibilityLevel';
import { AccessLevel } from '../core/AccessLevel';

export default class RegionDAO extends DAO {

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
    return this.parentRef().collection("region");
  }

  addRegion(command,transaction = null) {
    return this.add(this.collection(),command.currentAccount,{
      name: command.name,
      description: command.description,
      access: Object.assign({},{
        visibility: VisibilityLevel.PROTECTED,
        level: AccessLevel.WRITE
      },command.access)
    },transaction);
  }

  findAllVisibleRegions() {
    return this.collection().where("access.visibility",">",VisibilityLevel.PRIVATE);
  }

  async canDoWithRegion(regionId,userId,accessLevel) {
    const region = await this.find(regionId).get();
    const regionData = region.data();
    const regionAccessLevel:any = regionData.access.level;
    const isNumber: boolean = typeof regionAccessLevel === "number";

    if (isNumber) {
      console.log(`${regionAccessLevel} >= ${accessLevel}`);

      return regionAccessLevel >= accessLevel;
    } else {
      const userAccessLevel = regionAccessLevel[userId];
      return userAccessLevel >= accessLevel;
    }

  }

  parentRef() {
    return this.realmDAO.find(this.realmId);
  }

}
