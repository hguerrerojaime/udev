const Vue = require('vue').default;

const DATE = require('../../types/index').date;

Vue.component('v-output-date', {
  props: {
    vModel: Object,
    format: {
      type: String,
      default: "YYYY-MM-DD"
    }
  },
  model: {
    prop: 'vModel'
  },
  data: function() {
    return {
      value: DATE.toS(this.$props.vModel, this.$props)
    };
  },
  template: `
    <span>{{ value }}</span>
  `
});
