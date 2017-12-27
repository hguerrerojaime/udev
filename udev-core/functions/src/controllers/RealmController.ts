import RestController from './RestController';

import { inject } from "inversify";

export default class RealmController extends RestController {

  constructor(
    @inject("realmService") private realmService
  ) {
    super();
  }

  async register($request) {
    return await this.realmService.register($request.body);
  }

  async show(realmId) {
    return await this.realmService.get(realmId);
  }

}
