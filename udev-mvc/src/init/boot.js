function configureRouter(app,mvcModule,routes) {
  console.log("Configuring router...");
  for (let key in routes) {
    let route = routes[key];

    for (let method in route) {
      let methodArgs = route[method];
      console.log(`Configuring ${method} ${key} to controller: ${methodArgs.controller}, action: ${methodArgs.action}`);

      app[method](key,function(req,res) {
        let controller = mvcModule.factory(`${methodArgs.controller}Controller`);
        let action = controller[methodArgs.action];
        let requestProcessor = mvcModule.service('requestProcessor');
        requestProcessor.process(controller,action,req,res);
      });
    }
  }
}

function createMvcModule(dependencies,DI = require('node-di')) {
  return require('../core/mvc-module').create(dependencies,DI);
}

function boot(args = {}) {
  let express = args.express;
  let dependencies = args.dependencies;
  let routes = args.routes;
  let DI = args.DI;

  let mvcModule = createMvcModule(dependencies,DI);
  let app = express();
  configureRouter(app,mvcModule,routes);

  return {
    app: app,
    dependencies: dependencies,
    routes: routes,
    mvcModule: mvcModule
  };
}

module.exports = boot;
