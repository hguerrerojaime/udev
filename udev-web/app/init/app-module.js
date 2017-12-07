function injectValues(appModule,values = {}) {
  for (let key in values) {
    let value = values[key];
    console.log(`Register value [${key}]`);
    appModule.value(key,value);
  }
  console.log("Register value [currentModule]");
  appModule.value('currentModule',appModule);
}

function injectFactories(appModule, factories = {}) {
  for (let key in factories) {
    let value = factories[key];
    console.log(`Register factory [${key}]`);
    appModule.factory(key,value);
  }
}

function injectServices(appModule, services= {}) {
  for (let key in services) {
    let value = services[key];
    console.log(`Register service [${key}]`);
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
  injectDependencies(appModule,dependencies);
  return appModule;
}


module.exports = {
  create: createAppModule
};
