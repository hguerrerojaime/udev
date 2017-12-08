const Vue = require('vue').default;

Vue.component('v-link-button', {
  props: {
    brand: {
      type: String,
      default: "default"
    },
    label: {
      type: String
    },
    href: {
      type: String,
      default: "javascript:void(0);"
    },
    icon: {
      type: String
    }
  },
  template: `
    <a v-bind:href="href" v-bind:class="'btn btn-'+brand">
      <i v-bind:class="icon" v-if="icon"></i>
      <span v-if="label">{{label}}</span>
    </a>
  `
});
