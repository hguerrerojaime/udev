const Vue = require('vue').default;

Vue.component('v-admin-panel', {
  props: {
    appInfo: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  template: `
    <div>
      <v-top-bar v-bind:title="appInfo.name"></v-top-bar>
      <v-side-bar v-bind:default-app-code="appInfo.code">
        <template slot="navigator"><slot name="navigator"></slot></template>
        <template slot="menu-items"><slot name="menu-items"></slot></template>
      </v-side-bar>
      <v-body>
        <slot></slot>
      </v-body>
    </div>
  `
});
