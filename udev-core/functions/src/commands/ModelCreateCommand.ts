import { Model } from 'udev-model-ts';

@Model()
export class ModelCreateCommand {

  static attrs = {
    realmId: { type: "string", validations: { presence: true } },
    regionId: { type: "string", validations: { presence: true } },
    name: { type: "string", validations: { presence: true } },
    label: { type: "string", validations: { presence: true } },
    pluralLabel: { type: "string", validations: { presence: true } },
    description: { type: "string", validations: { presence: true } },
    keyFieldType: { type: "string", validations: { presence: true } },
    ketFieldOptions: { type: "object", validations: { presence: true } }
  }

}
