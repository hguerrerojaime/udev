const Vue = require('vue').default;

Vue.component('v-output-text', {
  props: {
    vModel: String
  },
  model: {
    prop: 'vModel'
  },
  template: `
    <span>{{ vModel }}</span>
  `
});
