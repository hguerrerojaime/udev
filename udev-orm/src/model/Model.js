import { decorate } from 'udev-core';

import model from '../meta/model';

export default function Model(target,annotation = Model) {

  function enhance(target) {
    decorate(target,annotation);
    generateModel(target);
    injectmodel(target);
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

    target.prototype.json = function() {
      return this.model.toJSON();
    };

    target.meta.model = entityModel;

  }

  function injectmodel(target) {

    for (let key in target.attrs) {
      Object.defineProperty(target.prototype, key, {
        set: function(value) { this.model[key](value); },
        get: function() { return this.model[key](); }
      });
    }

    Object.defineProperty(target.prototype,"errors", {
      //set: function(value) { throw "this is a read only attribute" },
      get: function() { return this.model.errors }
    });

  }

  function enhanceConstructor(target){
      return class extends target {
          constructor(attrs = {}) {
              super();
              this.model = new target.meta.model(attrs);
              this.model.isValid();
          }
      };
  }



  return enhance(target);
}
