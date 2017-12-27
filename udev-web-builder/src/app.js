
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
  router: router,
  data: {
    appInfo: {
      name: "Application Builder"
    }
  },
  methods: {
    getCurrentPath() {
      return this.$router.currentRoute.path;
    }
  },
  template: `
  <v-admin-panel :app-info="appInfo">
    <template slot="menu-items">
      <li><a href="#/region">Regions</a></li>
    </template>
    <template slot="breadcrumbs" v-if="$breadcrumbs.length">
      <li>
        <router-link to="/" v-if="getCurrentPath() !== '/home'">
          <em class="fa fa-home"></em>
        </router-link>
        <template v-else>
          <em class="fa fa-home"></em>
        </template>
      </li>
      <li v-for="(crumb,key) in $breadcrumbs" v-if="crumb.path !== '/home'">
        <router-link :to="crumb.path" :key="key" v-if="getCurrentPath() !== crumb.path">
          {{ crumb.meta.breadcrumb }}
        </router-link>
        <template v-else>
          {{ crumb.meta.breadcrumb }}
        </template>
      </li>
    </template>
    <router-view></router-view>

  </v-admin-panel>
  `
});

module.exports = app;
