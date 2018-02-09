import { RestController } from 'udev-mvc-ts';
import { inject } from "inversify";

export default class ModelController extends RestController {

  constructor(
    @inject("modelService") private modelService
  ) {
    super();
  }

  async create($request,realmId,regionId) {
    const command = $request.body;
    return await this.modelService.create(realmId,regionId,
      Object.assign({},command,{ currentAccount: $request.user.uid })
    );
  }

}
