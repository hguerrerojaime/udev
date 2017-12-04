function registerLookAndFeel() {
  require('bootstrap');
  require("font-awesome-webpack");
}

function registerComponents() {
  require('./components/index');
}


function injectDependencies(dependencies,injector) {
  for (let key in dependencies) {
    let dependency = dependencies[key];
    injector[dependency.type](key,dependency.value);
  }
}

function registerInjector(Vue,injector,dependencies) {
  Vue.use(injector);
  Vue.prototype.dependencies = Object.keys(dependencies);
}

function registerConfig(Vue,vueConfig,config) {
  Vue.use(vueConfig, config);
}

const vueConfig = require('vue-config');
const Vue = require('vue').default;

const injector = require('vue-inject');
const dependencies = require('./dependencies');
const config = require('./config');

injectDependencies(dependencies,injector);
registerInjector(Vue,injector,dependencies);
registerConfig(Vue,vueConfig,config);
registerLookAndFeel();
registerComponents();
