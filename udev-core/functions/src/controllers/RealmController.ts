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
    console.log(RealmCreateCommand.prototype);
    return await this.realmService.register($request.body);
  }

  async show(realmId) {
    return await this.realmService.get(realmId);
  }

}
