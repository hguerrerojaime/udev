import DAO from './DAO';

export default class RealmDAO extends DAO {

  find(id) {
    return this.collection().doc(id);
  }

  findByName(name) {
    return this.findOne(this.collection().where("name","==",name));
  }

  collection() {
    return this.parentRef().collection("realm");
  }

  addRealm(command) {
    return this.add(this.collection(),command.currentAccount,{
      name: command.name,
      description: command.description
    });
  }

}
