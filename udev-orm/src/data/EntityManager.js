const BASE_FINDERS = ['findBy','findAllBy','countBy'];

export default class EntityManager {



  constructor(dataSource,persistenceContext,autoEnhance = true) {
    this._dataSource = dataSource;
    this._persistenceContext = persistenceContext;

    if (autoEnhance) {
      this.enhanceEntities();
    }

  }

  get dataSource() {
    return this._dataSource;
  }

  get persistenceContext() {
    return this._persistenceContext;
  }

  all(clazz) {
    throw "not yet implemented";
  }

  get(clazz,id) {
    throw "not yet implemented";
  }

  save(instance) {
    throw "not yet implemented";
  }

  enhanceEntities() {
    this.persistenceContext.entities.forEach((target) => {
      this.injectFinders(target);
      this.injectWriters(target);
    });
  }

  injectFinders(target) {
    let $em = this;

    target.get = function(id) { return $em.get(target,id); };
    target.all = function(params = {}) { return $em.all(target); };
    target.count = function() {};
    target.where = function(criteria = (c) => {}) {};

    for (let attr in target.meta.model.attrs) {
      for (let finder of BASE_FINDERS) {
        let finderName = finder+attr.capitalize();
        target[finderName] = function(value,params = {}) {};
      }
    }
  }

  injectWriters(target) {
    let $em = this;
    target.prototype.save = function(options = {}) {
      return $em.save(this);
    };
    target.prototype.delete = function() {};
    target.insertMany = function(entities = []) {};
    target.deleteMany = function(entities = []) {};
  }

}
