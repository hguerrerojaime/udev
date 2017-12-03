const Vue = require('vue').default;

const LAND_LINE = 'L';
const MOBILE = 'M';
const FAX = 'F';
const PHONE_TYPES = [LAND_LINE,MOBILE,FAX];

Vue.component('v-output-phone', {
  props: {
    vModel: String
  },
  model: {
    prop: 'vModel'
  },
  data: function() {
    return {
      phoneTypes: {
        [LAND_LINE]: {
          label: "Land Line",
          icon: "fa fa-phone"
        },
        [MOBILE]: {
          label: "Mobile",
          icon: "fa fa-mobile"
        },
        [FAX]: {
          label: "Fax",
          icon: "fa fa-fax"
        }
      }
    }
  },
  template: `
    <span><i v-bind:class="phoneTypes[vModel.type].icon"></i> {{ vModel.number }}</span>
  `
});
