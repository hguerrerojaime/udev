import { RestController } from 'udev-mvc-ts';
import { inject } from "inversify";

import { RealmCreateCommand } from '../commands/RealmCreateCommand';

export default class RealmController extends RestController {

  constructor(
    @inject("realmService") private realmService
  ) {
    super();
  }

  async register($request) {
    const command = $request.body;
    return await this.realmService.register(Object.assign({},command,{ currentAccount: $request.user.uid }));
  }

  async show(realmId) {
    return await this.realmService.get(realmId);
  }

}
