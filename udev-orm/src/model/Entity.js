export default function Entity(options = {}) {
  return function decorator(target) {
    let opts = Object.assign({},{
      name: target.constructor.name
    },options);

    target._entity = {
      options: opts
    };
  }
}
