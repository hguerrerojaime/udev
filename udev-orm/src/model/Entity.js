import model from 'node-model';

export default function Entity(options = {}) {

  function enhanceEntity(target) {

    generateModel(target);
    injectAttributes(target);
  }

  function generateModel(target) {
    let entityModel = model(target.name);

    for (let key in target.attrs) {
      let value = target.attrs[key];
      let opts = typeof value === "string" ? { type:value } : value;

      if (opts.type == "any") {
        delete opts.type;
      }

      entityModel = entityModel.attr(key,opts);
    }

    target._entity.model = entityModel;

  }

  function injectAttributes(target) {


    for (let key in target.attrs) {
      Object.defineProperty(target, key, {
        set: property.setter, get: property.getter
      });
    }

    console.log(target.prototype);

  }

  return function decorator(target) {
    let opts = Object.assign({},{
      name: target.name
    },options);

    if (!target.attrs) {
      target.attrs = {};
    }

    target._entity = {
      name: opts.name,
      options: opts
    };

    enhanceEntity(target);
  }
}
