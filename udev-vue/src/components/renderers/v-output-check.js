const Vue = require('vue').default;

const CHECK = require('../../types/index').check;

Vue.component('v-output-check', {
  props: {
    vModel: Boolean
  },
  model: {
    prop: 'vModel'
  },
  data: function() {
    return {
      value: CHECK.toS(this.$props.vModel)
    };
  },
  template: `
    <span>{{ value }}</span>
  `
});
