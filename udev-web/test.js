const parameterfy = require('./app/core/util').parameterfy;

function A() {
  this.cool = "a";

  this.noparams = function() {
    console.log("calling noparams");
    return this.cool;
  }

  this.params = function(req) {
    console.log("calling params");
    return req;
  }
}

var a = new A();

var noparamsProxy = parameterfy(a.noparams,a);
var paramsProxy = parameterfy(a.params);


//console.log(a.noparams.call(a));
console.log(noparamsProxy({ req: "x" }));
console.log(paramsProxy({ req: "xyyy" }));
