const Vue = require('vue').default;

Vue.component('v-form-group', {
  props: {
    label: {
      type: String,
      required: true
    }
  },
  template: `
    <div class="form-group">
      <label class="col-md-1 control-label">{{ label }}</label>
      <div class="col-md-11">
        <slot></slot>
      </div>
    </div>

  `
});
