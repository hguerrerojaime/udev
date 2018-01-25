import { RestController } from 'udev-mvc-ts';
import { inject } from "inversify";
import { RegionCreateCommand } from '../commands/RegionCreateCommand';

export default class RegionController extends RestController {

  constructor(
    @inject("regionService") private regionService
  ) {
    super();
  }

  async create($request, realmId) {
    return await this.regionService.create(Object.assign({},$request.body,{ realmId: realmId }));
  }

  async list(realmId) {
    return await this.regionService.list(realmId);
  }

  async show(realmId,regionId) {
    return await this.regionService.get(realmId,regionId);
  }

}
