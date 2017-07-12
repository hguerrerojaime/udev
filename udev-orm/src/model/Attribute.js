export default function Attribute(options) {
  return function (target,key,descriptor) {

    console.log(descriptor);
    let opts = Object.assign({},{
      name: descriptor.value.name
    },options);

    descriptor._attr = {
      name: opts.name,
      options: opts
    };

    return descriptor;
  }
}
