const Vue = require('vue').default;

Vue.component('v-form-group', {
  props: {
    label: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 9
    },
    size: {
      type: String,
      default: "md"
    }
  },
  template: `
    <div class="form-group">
      <label v-bind:class="'col-'+size+'-'+(12-width)+' control-label'">{{ label }}</label>
      <div v-bind:class="'col-'+size+'-'+width">
        <slot></slot>
      </div>
    </div>
  `
});
