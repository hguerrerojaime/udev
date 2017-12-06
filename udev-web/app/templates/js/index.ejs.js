const Vue = udev.Vue;

udev.boot();

var app = new Vue({
  el: "#app",
  data: {
    appInfo: appInfo
  },
  template: `
  <v-admin-panel v-bind:app-info="appInfo">
    <v-panel v-bind:title="appInfo.name +' Index'">
      Welcome
    </v-panel>
  </v-admin-panel>
  `
});
