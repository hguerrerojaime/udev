
const udev = require('udev-vue');
const Vue = udev.Vue;
const VueRouter = require('vue-router').default;
const VueBreadcrumbs = require('vue-breadcrumbs');

Vue.use(VueBreadcrumbs);
Vue.use(VueRouter);


const router = new VueRouter({ routes: require('./config/routes') });

udev.boot();

var app = new Vue({
  el: "#app",
  router: router
});

module.exports = app;
