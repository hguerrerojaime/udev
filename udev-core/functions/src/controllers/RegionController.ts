import RestController from './RestController';

import { inject } from "inversify";

export default class RegionController extends RestController {

  constructor(
    @inject("regionService") private regionService
  ) {
    super();
  }

  async create($request, realmId) {
    return await this.regionService.create(realmId,$request.body);
  }

  async list(realmId) {
    return await this.regionService.list(realmId);
  }

  async show(realmId,regionId) {
    return await this.regionService.get(realmId,regionId);
  }

}
