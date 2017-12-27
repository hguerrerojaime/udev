import { Container } from "inversify";

function injectValues(mvcModule,values = {}) {
  for (const key in values) {
    const value = values[key];
    console.log(`Register value [${key}]`);
    mvcModule.bind(key).toConstantValue(value);
  }
  console.log("Register value [currentModule]");
  mvcModule.bind('currentModule').toConstantValue(mvcModule);
}

function injectControllers(mvcModule, controllers = {}) {
  for (const key in controllers) {
    const value = controllers[key];
    console.log(`Register controller [${key}]`);
    mvcModule.bind(key).to(value);
  }
}

// function injectFactories(mvcModule, factories = {}) {
//   for (let key in factories) {
//     let value = factories[key];
//     console.log(`Register factory [${key}]`);
//     mvcModule.factory(key,value);
//   }
// }

function injectServices(mvcModule, services= {}) {
  for (const key in services) {
    const value = services[key];
    console.log(`Register service [${key}]`);
    mvcModule.bind(key).to(value);
  }
}

function injectRequestProcessor(mvcModule) {
  mvcModule.bind('requestProcessor').to(require('./RequestProcessor').default);
}

function injectDependencies(mvcModule,dependencies = <any>{}) {
  injectValues(mvcModule,dependencies.values);
  // injectFactories(mvcModule,dependencies.factories);
  injectServices(mvcModule,dependencies.services);
  injectRequestProcessor(mvcModule);
  injectControllers(mvcModule,dependencies.controllers);
}

function createMvcModule(dependencies = <any>{}) {
  const mvcModule = new Container();
  injectDependencies(mvcModule,dependencies);
  return mvcModule;
}


module.exports = {
  create: createMvcModule
};
