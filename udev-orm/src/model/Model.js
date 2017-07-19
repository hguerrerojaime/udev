import model from 'node-model';

import { decorate } from 'udev-core';

export default function Model(target,annotation = Model) {

  function enhance(target) {
    decorate(target,annotation);
    generateModel(target);
    injectAttributes(target);
    return enhanceConstructor(target);
  }

  function generateModel(target) {
    let entityModel = model(target.name);

    for (let key in target.attrs) {
      let value = target.attrs[key];
      let opts = { type:value } ;

      if (opts.type == "any") {
        delete opts.type;
      }

      entityModel.attr(key,opts);
    }

    target.meta.model = entityModel;

  }

  function injectAttributes(target) {

    for (let key in target.attrs) {
      Object.defineProperty(target.prototype, key, {
        set: function(value) { this.attributes[key](value); },
        get: function() { return this.attributes[key](); }
      });
    }

    Object.defineProperty(target.prototype,"errors", {
      set: function(value) { throw "this is a read only attribute" },
      get: function() { return this.attributes.attrErrors }
    });

  }

  function enhanceConstructor(target){
      return class extends target {
          constructor(attrs = {}) {
              super();
              this.attributes = new target.meta.model(attrs);
              this.attributes.isValid();
          }
      };
  }



  return enhance(target);
}
