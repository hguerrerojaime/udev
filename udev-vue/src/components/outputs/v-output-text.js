const Vue = require('vue').default;

const TEXT = require('../../types/index').text;

Vue.component('v-output-text', {
  props: {
    vModel: String
  },
  model: {
    prop: 'vModel'
  },
  data: function() {
    return {
      value: TEXT.toS(this.$props.vModel)
    };
  },
  template: `
    <span>{{ value }}</span>
  `
});
