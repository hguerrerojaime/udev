import model from 'node-model';

import Validateable from './Validateable';

export default function Entity(options = {},annotation = Entity) {

  

  function enhance(target) {
    let modelConstructor = Validateable(target,annotation);

    injectId(target);

    return modelConstructor;
  }

  function injectId(target) {
    target.meta.model.attr('id');

    Object.defineProperty(target.prototype, "id", {
      set: function(value) { this.attributes.id(value); },
      get: function() { return this.attributes.id(); }
    });
  }

  return function decorator(target) {

    let opts = Object.assign({},{
      collectionName: target.name.uncapitalize()
    },options);

    target.entity = opts;

    return enhance(target);
  }

}
