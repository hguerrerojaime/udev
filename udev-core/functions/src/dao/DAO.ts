import { injectable, inject } from "inversify";

@injectable()
export default class DAO {

  public constructor(
    @inject("db") private db,
    @inject("recordAuditor") protected recordAuditor
  ) { }

  add(collection,currentAccount,data = {}) {
    return collection.add(this.recordAuditor.insert(currentAccount,data));
  }

  set(document,currentAccount,data = {},update = false) {
    if (update) {
      return document.set(this.recordAuditor.update(currentAccount,data));
    } else {
      return document.set(this.recordAuditor.insert(currentAccount,data));
    }
  }

  async findAllIn(collection,ids = []) {

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
