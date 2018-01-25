import { injectable, inject } from "inversify";

@injectable()
export default class RegionService {

  public constructor(
    @inject("regionDAOFactory") private regionDAOFactory
  ) { }

  async create(command) {

    const regionDAO = this.regionDAOFactory(command.realmId);

    const ref = await regionDAO.collection().add({
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

  async list(realmId) {
    const regionDAO = this.regionDAOFactory(realmId);
    const regionList =  await regionDAO.collection().get();

    const result = [];

    regionList.forEach((doc) => {
      result.push(Object.assign({},doc.data(),{ id: doc.id }));
    });

    return result;
  }

  async exists(realmId,id) {
    const regionDAO = this.regionDAOFactory(realmId);
    const ref = regionDAO.find(id);
    const doc = await ref.get();

    return doc.exists;
  }

  async get(realmId,id) {
    const regionDAO = this.regionDAOFactory(realmId);
    const ref = regionDAO.find(id);
    const doc = await ref.get();

    if (doc.exists) {
      return Object.assign({},doc.data(), { id: id });
    }
  }

}
