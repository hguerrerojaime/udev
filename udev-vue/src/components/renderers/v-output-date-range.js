const Vue = require('vue').default;

const DATE_RANGE = require('../../types/index').dateRange;

Vue.component('v-output-date-range', {
  props: {
    vModel: Object,
    format: {
      type: String,
      default: "From: [{start}] To: [{end}]"
    },
    dateFormat: {
      type: String,
      default: "YYYY-MM-DD"
    }
  },
  model: {
    prop: 'vModel'
  },
  data: function() {
    return {
      value: DATE.toS(this.$props.vModel,this.$props)
    };
  },
  template: `
    <span>{{ value }}</span>
  `
});
