const parameterfy = require('./app/core/util').parameterfy;

const JClass = require("jclass");

const MyClass = JClass._extend({
  async params(req) {
    console.log("calling params");
    return req;
  }
});

var instance = new MyClass();
var mcParamsProxy = parameterfy(instance.params,instance);

console.log(mcParamsProxy({req: 1}));


// function A() {
//   this.cool = "a";
//
//   this.noparams = function() {
//     console.log("calling noparams");
//     return this.cool;
//   }
//
//   this.params = async function params(req) {
//     console.log("calling params");
//     return req;
//   }
// }
//
// var a = new A();
//
//
// console.log(instance.params);
// console.log(a.params);
//
// var mcParamsProxy = parameterfy(instance.params);
//
// var noparamsProxy = parameterfy(a.noparams,a);
// var paramsProxy = parameterfy(a.params);
//
// //console.log(a.noparams.call(a));
// console.log(noparamsProxy({ req: "x" }));
// console.log(paramsProxy({ req: "xyyy" }));
// console.log(mcParamsProxy({ req: 'a' }));
