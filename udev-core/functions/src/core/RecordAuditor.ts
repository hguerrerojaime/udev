import { injectable } from "inversify";

@injectable()
export default class RecordAuditor {

  insert(currentAccount,data = {}) {
    return Object.assign({},data,{
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: currentAccount,
      updatedBy: currentAccount
    });
  }

  update(currentAccount,data = {}) {
    return Object.assign({},data,{
      updatedAt: new Date(),
      updatedBy: currentAccount
    });
  }

}
