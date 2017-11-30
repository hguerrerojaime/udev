const Vue = require('vue').default;

Vue.component('v-div-row', {
  template: `
    <div class="row">
      <slot></slot>
    </div>
  `
});
