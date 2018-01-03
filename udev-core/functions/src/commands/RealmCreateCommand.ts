import { Model } from 'udev-model-ts';

@Model()
export class RealmCreateCommand {

  static attrs = {
    name: { type: "string", validations: { presence: true } },
    description: { type: "string", validations: { presence: true } },
    userId: { type: "string", validations: { presence: true } }
  }

}
