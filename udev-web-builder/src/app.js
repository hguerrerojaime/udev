
const udev = require('udev-vue');
const Vue = udev.Vue;
const VueRouter = require('vue-router').default;

Vue.use(VueRouter);

const router = new VueRouter({ routes: require('./config/routes') });

udev.boot();

var app = new Vue({
  el: "#app",
  router: router,
  data: {
    appInfo: {
      name: "Application Builder"
    }
  },
  template: `
  <v-admin-panel :app-info="appInfo">
    <template slot="menu-items">
      <li><a href="#/region">Regions</a></li>
    </template>

    <router-view></router-view>

  </v-admin-panel>
  `
});

module.exports = app;
