
const udev = require('udev-vue');
const Vue = udev.Vue;

udev.boot();

var app = new Vue({
  el: "#app",
  data: {

  },
  template: `
  <v-admin-panel>
    <v-panel title="Dashboard">

    </v-panel>
  </v-admin-panel>
  `
});

module.exports = app;
