const Vue = require('vue').default;

const SELECT = require('../../types/index').select;

Vue.component('v-output-text', {
  props: {
    vModel: String
  },
  model: {
    prop: 'vModel'
  },
  data: function() {
    return {
      value: SELECT.toS(this.$props.vModel)
    };
  },
  template: `
    <span>{{ value }}</span>
  `
});
