const Vue = require('vue').default;

const MULTISELECT = require('../../types/index').multiselect;

Vue.component('v-output-multiselect', {
  props: {
    vModel: String
  },
  model: {
    prop: 'vModel'
  },
  data: function() {
    return {
      value: MULTISELECT.toS(this.$props.vModel)
    };
  },
  template: `
    <span>{{ value }}</span>
  `
});
