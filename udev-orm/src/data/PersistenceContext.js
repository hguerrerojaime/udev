import EntityException from '../exceptions/EntityException';

export default class PersistenceContext {

  constructor(entities = []) {
    this.entities = []
    this.registerEntities(entities);
  }

  registerEntities(classes = []) {
    classes.forEach(this.registerEntity);
  }

  registerEntity(clazz) {
    let hasEntityAnnotation = clazz.meta && clazz.meta.annotations && clazz.meta.annotations.Entity;

    if (!hasEntityAnnotation) {
      throw new EntityException("The class "+clazz.name+" is not an Entity, you must annotate it with @Entity");
    }

    this.entities.push(clazz);
  }

}
