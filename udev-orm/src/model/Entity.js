import model from 'node-model';

import Validateable from './Validateable';

export default function Entity(options = {}) {

  const BASE_FINDERS = ['findBy','findAllBy','countBy'];

  function enhance(target) {
    let modelConstructor = Validateable()(target);

    target.meta.annotations.Entity = Entity;

    injectId(target);
    injectFinders(target);
    injectWriters(target);

    return modelConstructor;
  }

  function injectId(target) {
    target.meta.model.attr('id');

    Object.defineProperty(target.prototype, "id", {
      set: function(value) { this.attributes.id(value); },
      get: function() { return this.attributes.id(); }
    });
  }

  function injectFinders(target) {

    target.get = function(id) {};
    target.all = function(params = {}) {};
    target.count = function() {};
    target.where = function(criteria = (c) => {}) {};

    for (let attr in target.meta.model.attrs) {
      for (let finder of BASE_FINDERS) {
        let finderName = finder+attr.capitalize();
        target[finderName] = function(value,params = {}) {};
      }
    }
  }

  function injectWriters(target) {
    target.prototype.save = function(options = {}) {};
    target.prototype.delete = function() {};
    target.insertMany = function(entities = []) {};
    target.deleteMany = function(entities = []) {};
  }

  return function decorator(target) {

    let opts = Object.assign({},{
      documentName: target.name.uncapitalize()
    },options);

    return enhance(target);
  }

}
