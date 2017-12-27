import { injectable, inject } from "inversify";

@injectable()
export default class RegionService {

  public constructor(
    @inject("realmService") private realmService
  ) { }

  async create(realmId,command) {

    if (this.realmService.exists(realmId)) {
      const realmRef = await this.realmService.ref(realmId);
      const ref = realmRef.collection('region').add({
        name: command.name,
        description: command.description,
        release: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return await this.get(realmId,ref.id);
    }

  }

  ref(realmId,id) {
    return this.collectionRef(realmId).doc(id);
  }

  collectionRef(realmId) {
    return this.realmService.ref(realmId).collection('region');
  }

  async list(realmId) {
    const regionList =  await this.collectionRef(realmId).get();

    const result = [];

    regionList.forEach((doc) => {
      result.push(Object.assign({},doc.data(),{ id: doc.id }));
    });

    return result;
  }

  async get(realmId,id) {
    const ref = this.ref(realmId,id);
    const doc = await ref.get();

    if (doc.exists) {
      return Object.assign({},doc.data(), { id: id });
    }
  }

}
