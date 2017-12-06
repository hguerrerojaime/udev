const Vue = require('vue').default;

Vue.component('v-admin-panel', {
  props: {
    appInfo: {
      type: Object,
      default: {}
    }
  },
  template: `
    <div>
      <v-top-bar v-bind:title="appInfo.name"></v-top-bar>
      <v-side-bar
        v-bind:menu-items="appInfo.menuItems"
        v-bind:application-items="appInfo.applications"
        v-bind:default-app-code="appInfo.code"
      ></v-side-bar>
      <v-body>
        <slot></slot>
      </v-body>
    </div>
  `
});
