function injectValues(appModule,values = {}) {
  for (let key in values) {
    let value = values[key];
    console.log(`Injecting value [${key}] => [${JSON.stringify(value)}]`);
    appModule.value(key,value);
  }
}

function injectFactories(appModule, factories = {}) {
  for (let key in factories) {
    let value = factories[key];
    console.log(`Injecting value [${key}] => [${JSON.stringify(value)}]`);
    appModule.factory(key,value);
  }
}

function injectServices(appModule, services= {}) {
  for (let key in services) {
    let value = services[key];
    console.log(`Injecting value [${key}] => [${JSON.stringify(value)}]`);
    appModule.service(key,value);
  }
}

function injectDependencies(appModule,dependencies = {}) {
  injectValues(appModule,dependencies.values);
  injectFactories(appModule,dependencies.factories);
  injectServices(appModule,dependencies.services);
}

function createAppModule(dependencies = require('./dependencies'),DI = require('node-di')) {
  let appModule = DI.module('appModule',[]);
  injectDependencies(appModule);
  return appModule;
}


module.exports = {
  create: createAppModule
};
