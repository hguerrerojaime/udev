const Vue = require('vue').default;

const NUMBER = require('../../types/index').number;

Vue.component('v-output-number', {
  props: {
    vModel: Number
  },
  model: {
    prop: 'vModel'
  },
  data: function() {
    return {
      value: NUMBER.toS(this.$props.vModel)
    };
  },
  template: `
    <span>{{ value }}</span>
  `
});
