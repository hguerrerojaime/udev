const Vue = require('vue').default;

Vue.component('v-well', {
  props: {
    size: {
      type: String,
      default: "md"
    },
    width: {
      type: Number,
      width: 12
    }
  },
  template: `
    <div v-bind:class="'well well-'+size">
      <slot></slot>
    </div>
  `
});
