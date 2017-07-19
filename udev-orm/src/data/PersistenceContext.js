import Entity from '../model/Entity';

export default class PersistenceContext {

  _entities = [];

  get entities() {
    return this._entities;
  }

  registerEntity(entity) {
    let annotations = Object.getVal(entity,"meta.annotations");
    if (!annotations || !annotations.includes(Entity)) {
      throw "Not an Entity";
    }
    this.entities.push(entity);
  }

  hasEntity(entity) {
    return this.entities.includes(entity);
  }

}
