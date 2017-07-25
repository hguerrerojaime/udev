import Entity from '../model/Entity';

export default class PersistenceContext {

  _entities = [];

  get entities() {
    return this._entities;
  }

  registerEntity(clazz) {
    let annotations = Object.getVal(clazz,"meta.annotations");

    if (!annotations || !annotations.Entity) {
      throw "Not an Entity";
    }
    this.entities.push(clazz);
  }

  hasEntity(clazz) {
    return this.entities.includes(clazz);
  }

  getCollectionName(clazz) {
    if (this.hasEntity(clazz)) {
      return clazz.entity.collectionName;
    }
  }

}
