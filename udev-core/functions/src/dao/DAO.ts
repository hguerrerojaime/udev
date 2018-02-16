import { injectable, inject } from "inversify";

@injectable()
export default class DAO {

  public constructor(
    @inject("db") protected db,
    @inject("recordAuditor") protected recordAuditor
  ) { }

  add(collection,currentAccount,data = {}, transaction = null) {

    if (transaction) {
      return this.set(collection.doc(),currentAccount,data,false,transaction);
    } else {
      return collection.add(this.recordAuditor.insert(currentAccount,data));
    }

  }

  set(document,currentAccount,data = {},update = false,transaction = null) {

    const fullData = update ?
      this.recordAuditor.update(currentAccount,data) :
      this.recordAuditor.insert(currentAccount,data)
    ;

    if (transaction) {
      if (update) {
        transaction.update(document,fullData);
      } else {
        transaction.set(document,fullData);
      }
      return document;

    }  else if (update) {
      return document.set(fullData,{ merge: true });
    } else {
      return document.set(fullData);
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
