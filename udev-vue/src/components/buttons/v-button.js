const Vue = require('vue').default;

Vue.component('v-button', {
  props: {
    brand: {
      type: String,
      default: "default"
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String
    }
  },
  template: `
    <button v-bind:class="'btn btn-'+brand"><i v-bind:class="icon" v-if="icon"></i> {{label}}</button>
  `
});
