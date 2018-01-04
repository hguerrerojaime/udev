const firebase = require('firebase');
const udev = require('udev-vue');
const Vue = udev.Vue;
const VueRouter = require('vue-router').default;
const VueBreadcrumbs = require('vue-breadcrumbs');

var config = {
    apiKey: "AIzaSyCseRd8hOC-UhdtSwX3bmVfRz8Q8BKtrzs",
    authDomain: "udev-373c6.firebaseapp.com",
    databaseURL: "https://udev-373c6.firebaseio.com",
    projectId: "udev-373c6",
    storageBucket: "udev-373c6.appspot.com",
    messagingSenderId: "96913776203"
};
firebase.initializeApp(config);

Vue.use(VueBreadcrumbs);
Vue.use(VueRouter);


const router = new VueRouter({ routes: require('./config/routes') });

udev.boot();

var app = new Vue({
  el: "#app",
  router: router,
  template: '<router-view />'
});

module.exports = app;
