const Vue = require('vue').default;

Vue.component('v-div-col', {
  props: {
    size: {
      type: String,
      default: "md"
    },
    width: {
      type: Number,
      default: 12
    }
  },
  template: `
    <div v-bind:class="'col-'+size+'-'+width">
      <slot></slot>
    </div>
  `
});
