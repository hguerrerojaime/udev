require('bootstrap');
require("font-awesome-webpack");

const vueConfig = require('vue-config');
const Vue = require('vue').default;
const config = require('./config');

Vue.use(vueConfig, config);

var app = require('./app');
