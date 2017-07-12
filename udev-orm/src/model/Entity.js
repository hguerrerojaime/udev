import model from 'node-model';

import Validateable from './Validateable';

export default function Entity(options = {}) {

  const BASE_FINDERS = ['findBy','findAllBy','countBy'];

  function enhance(target) {
    let modelConstructor = Validateable()(target);

    injectId(target);
    injectFinders(target);

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

    target.get = function(id) {
      console.log("getting "+target.name+" with id="+id);
    };

    for (let attr in target.attrs) {

      for (let finder of BASE_FINDERS) {
        let finderName = finder+attr.capitalize();

        target[finderName] = function(value) {
            console.log(target.name+" "+finderName+"="+value);
        };
      }

    }

  }

  return function decorator(target) {
    return enhance(target);
  }

}
