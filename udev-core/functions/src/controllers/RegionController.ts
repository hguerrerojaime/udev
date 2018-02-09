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

  async list($request,realmId) {
    const currentAccount = $request.user.uid;
    const regionCollection = await this.regionService.findAllRegionsByAccountId(realmId,currentAccount);
    const result = {};

    regionCollection.forEach(function(doc) {
      result[doc.id] = doc.data();
    });

    return result;
  }

  async show($request,realmId,regionId) {
    const currentAccount = $request.user.uid;
    return await this.regionService.get(realmId,currentAccount,regionId);
  }

}
