import { RestController } from 'udev-mvc-ts';
import { inject } from "inversify";
import { ModelCreateCommand } from '../commands/ModelCreateCommand';

export default class ModelController extends RestController {

  constructor(
    @inject("modelService") private modelService
  ) {
    super();
  }

  async create(realmId,regionId,$request) {


    return await this.modelService.create(
      Object.assign({},$request.body,{ realmId: realmId, regionId: regionId })
    );

  }

}
