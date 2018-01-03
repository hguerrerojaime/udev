import { injectable, inject } from "inversify";

@injectable()
export default class RealmService {

  public constructor(
    @inject("pathResolver") private pathResolver
  ) { }

  async register(command) {

    const ref = await this.pathResolver.lookup('realm').add({
      name: command.name,
      description: command.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: command.userId,
      updatedBy: command.userId
    });

    await ref.collection('region').add({
      name: "development",
      description: "Development Sandbox",
      release: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: command.userId,
      updatedBy: command.userId
    });

    return ref.id;

  }

  async exists(id) {
    const doc = await this.pathResolver.lookup(`realm["${id}"]`).get();
    return doc.exists;
  }

  async get(id) {
    const doc = await this.pathResolver.lookup(`realm["${id}"]`).get();
    if (doc.exists) {
      return Object.assign({},doc.data(), { id: id });
    }
  }

}
