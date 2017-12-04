const Vue = require('vue').default;

const PHONE = require('../../types/index').phone;

Vue.component('v-output-phone', {
  props: {
    vModel: Object
  },
  model: {
    prop: 'vModel'
  },
  data: function() {
    return {
      phoneTypes: PHONE.types
    }
  },
  template: `
    <span><i v-bind:class="phoneTypes[vModel.type].icon"></i> {{ vModel.number }}</span>
  `
});
