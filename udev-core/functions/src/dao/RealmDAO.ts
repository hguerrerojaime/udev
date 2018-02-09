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

  findAllPublicRealms() {
    return this.collection().where("private","==",false);
  }

  addRealm(command) {
    return this.add(this.collection(),command.currentAccount,Object.assign({},{
      name: command.name,
      description: command.description,
      private: command.private
    },{ private: true }));
  }

}
