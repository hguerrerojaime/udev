import { injectable, inject } from "inversify";

@injectable()
export default class RealmService {

  public constructor(
    @inject("db") private db
  ) { }

  async register(command) {

    const ref = await this.db.collection('realm').add({
      name: command.name,
      description: command.description,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await ref.collection('region').add({
      name: "development",
      description: "Development Sandbox",
      release: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return await this.get(ref.id);

  }

  ref(id) {
    return this.db.collection('realm').doc(id);
  }

  async exists(id) {
    const doc = await this.ref(id).get();
    return doc.exists;
  }
  async get(id) {
    const doc = await this.ref(id).get();

    if (doc.exists) {
      return Object.assign({},doc.data(), { id: id });
    }

  }

}
