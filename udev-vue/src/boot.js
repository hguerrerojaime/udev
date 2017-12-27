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
const injector = require('vue-inject');
const baseDependencies = require('./dependencies');
const config = require('./config');
const Vue = require('vue').default;

module.exports = function boot(dependencies = {}) {

  let deps = Object.assign({},baseDependencies,dependencies);

  injectDependencies(deps,injector);
  registerInjector(Vue,injector,deps);
  registerConfig(Vue,vueConfig,config);
  registerLookAndFeel();
  registerComponents();

};
