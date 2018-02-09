import { injectable, inject } from "inversify";

@injectable()
export default class DAO {

  public constructor(
    @inject("db") protected db,
    @inject("recordAuditor") protected recordAuditor
  ) { }

  add(collection,currentAccount,data = {}) {
    return collection.add(this.recordAuditor.insert(currentAccount,data));
  }

  set(document,currentAccount,data = {},update = false) {
    if (update) {
      return document.set(this.recordAuditor.update(currentAccount,data),{ merge: true });
    } else {
      return document.set(this.recordAuditor.insert(currentAccount,data));
    }
  }

  async findMany(collection,ids = []) {
    let result = [];

    for (const id of ids) {
      const doc = await collection.doc(id).get();
      if (doc.exists) {
        result.push(doc);
      }
    }

    return result;
  }

  async findOne(collection) {
    let result = undefined;
    let querySnapshot = await collection.limit(1).get();
    querySnapshot.forEach(function(doc) {
      result = doc;
    });
    return result;
  }

  parentRef() {
    return this.db;
  }

}
