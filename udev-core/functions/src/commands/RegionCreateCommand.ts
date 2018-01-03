import { Model } from 'udev-model-ts';

@Model()
export class RegionCreateCommand {

  static attrs = {
    realmId: { type: "string", validations: { presence: true } },
    name: { type: "string", validations: { presence: true } },
    description: { type: "string", validations: { presence: true } },
    userId: { type: "string", validations: { presence: true } }
  }

}
