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

  addRegion(command) {
    return this.add(this.collection(),command.currentAccount,{
      name: command.name,
      description: command.description,
      access: Object.assign({},{
        visibility: VisibilityLevel.PROTECTED,
        level: AccessLevel.WRITE
      },command.access)
    });
  }

  parentRef() {
    return this.realmDAO.find(this.realmId);
  }

}
