import { injectable, inject } from "inversify";
import { ModelCreateCommand } from '../commands/ModelCreateCommand';
import { UnauthorizedError } from '../errors/UnauthorizedError';

@injectable()
export default class ModelService {

  static SYSTEM_FIELDS:any[] = [
    {
      name: "createdAt",
      type: "TIMESTAMP",
      label:"Created At"
    },
    {
      name: "createdBy",
      type: "LOOKUP",
      label: "Created By",
      options: {
        model: "User"
      },
      defaultValues: ['CURRENT_ACCOUNT']
    },
    {
      name: "updatedAt",
      type: "TIMESTAMP",
      label: "Updated At"
    },
    {
      name: "updatedBy",
      type: "LOOKUP",
      label: "Created By",
      options: {
        model: "User"
      },
      defaultValues: ['CURRENT_ACCOUNT']
    }
  ];

  public constructor(
    @inject("modelDAOFactory") private modelDAOFactory,
    @inject("regionService") private regionService
  ) { }

  async create(realmId,regionId,command) {

    if (!await this.regionService.canWriteRegion(realmId,regionId,command.currentAccount)) {
      throw new UnauthorizedError("To perform this operation user needs at least write access to this region");
    }

    const modelDAO = this.modelDAOFactory(realmId,regionId);

    const ref = await modelDAO.addModel({
      currentAccount: command.currentAccount,
      name: command.name,
      label: command.label,
      pluralLabel: command.pluralLabel,
      description: command.description
    });

    await modelDAO.addField(
      ref.id,
      {
        currentAccount: command.currentAccount,
        name: "key",
        label: "Key",
        type: command.keyType,
        options: command.keyOptions
      },
      false
    );

    for (const systemField of ModelService.SYSTEM_FIELDS) {
      await modelDAO.addField(
        ref.id,
        {
          currentAccount: command.currentAccount,
          name: systemField.name,
          label: systemField.label,
          type: systemField.type,
          options: systemField.options
        },
        false
      );
    }

    return ref.id;
  }

  async list(realmId,regionId,accountId) {

    if (!await this.regionService.canReadRegion(realmId,regionId,accountId)) {
      throw new UnauthorizedError("To perform this operation user needs at least read access to this region");
    }

    const modelDAO = this.modelDAOFactory(realmId,regionId);
    const modelList = await modelDAO.collection().get();
    const result = {};

    modelList.forEach((doc) => {
      result[doc.id] = doc.data();
    });

    return result;
  }

  async get(realmId,regionId,accountId,id) {

    if (!await this.regionService.canReadRegion(realmId,regionId,accountId)) {
      throw new UnauthorizedError("To perform this operation user needs at least read access to this region");
    }

    const modelDAO = this.modelDAOFactory(realmId,regionId);
    const doc = await modelDAO.find(id).get();

    if (doc.exists) {
      return doc.data();
    }
  }

}
