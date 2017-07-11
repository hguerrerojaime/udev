export default function Attribute(options) {
  return function (target,key,descriptor) {
    let opts = Object.assign({},{
      name: "xyz"
    },options);
  }
}
