import { injectable, inject } from "inversify";

@injectable()
export default class RegionService {

  public constructor(
    @inject("realmService") private realmService,
    @inject("pathResolver") private pathResolver
  ) { }

  async create(command) {

    if (this.realmService.exists(command.realmId)) {
      const regionCollectionRef = this.pathResolver.lookup(`realm["${command.realmId}"].region`);
      const ref = await regionCollectionRef.add({
        name: command.name,
        description: command.description,
        release: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: command.userId,
        updatedBy: command.userId
      });
      return ref.id;
    }

  }

  async list(realmId) {
    const regionList =  await this.pathResolver.lookup(`realm["${realmId}"].region`).get();

    const result = [];

    regionList.forEach((doc) => {
      result.push(Object.assign({},doc.data(),{ id: doc.id }));
    });

    return result;
  }

  async exists(realmId,id) {
    const ref = this.pathResolver.lookup(`realm["${realmId}"].region["${id}"]`);
    const doc = await ref.get();

    return doc.exists;
  }

  async get(realmId,id) {
    const ref = this.pathResolver.lookup(`realm["${realmId}"].region["${id}"]`);
    const doc = await ref.get();

    if (doc.exists) {
      return Object.assign({},doc.data(), { id: id });
    }
  }

}
