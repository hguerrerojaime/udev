const Vue = require('vue').default;

Vue.component('v-admin-panel', {
  props: {
    menuItems: {
      type: Array,
      default: []
    }
  },
  template: `
    <div>
      <v-top-bar></v-top-bar>
      <v-side-bar v-bind:menu-items="menuItems"></v-side-bar>
      <v-body>
        <slot></slot>
      </v-body>
    </div>
  `
});
