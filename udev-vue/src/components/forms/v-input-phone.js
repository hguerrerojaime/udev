const Vue = require('vue').default;

require('jquery-mask-plugin');

const LAND_LINE = 'L';
const MOBILE = 'M';
const FAX = 'F';
const PHONE_TYPES = [LAND_LINE,MOBILE,FAX];

Vue.component('v-input-phone', {
  props: {
    vModel: Object
  },
  model: {
    prop: 'vModel',
    event: 'input'
  },
  methods: {
		updateValue(value) {

      let emitingValue = undefined;

      if (value) {
        emitingValue = {
          type: this.selectedType,
          number: value
        };
      }

			this.$emit('input', emitingValue);
		},

    selectPhoneType(key) {
      this.selectedType = key;

      if (this.$props.vModel) {
        this.phoneNumber = this.$props.vModel.number;
        this.$props.vModel.type = key;
      }

    }
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
      },
      phoneNumber: undefined,
      selectedType: LAND_LINE
    };
  },
  mounted: function() {
    let $this = this;

    $(this.$el).find('input').mask('(000) 000-0000',{
      onChange: function(value) {
        $this.updateValue(value);
      }
    });
  },
  template: `
    <div class="input-group">
      <input class="form-control" type="text" :value="phoneNumber" />
      <span class="input-group-btn">
        <button
          v-bind:title="phoneTypes[selectedType].label"
          type="button"
          class="btn btn-default dropdown-toggle"
          data-toggle="dropdown"
          aria-expanded="false"
        ><span class="type-text"><i v-bind:class="'menu-icon '+phoneTypes[selectedType].icon"></i></span> <span class="caret"></span></button>
        <ul class="list-group dropdown-menu" role="menu" style="right: 0; left: auto;">
          <li v-for="key in Object.keys(phoneTypes)">
            <a href="javascript:;" v-on:click="selectPhoneType(key)"><i v-bind:class="'menu-icon '+phoneTypes[key].icon" aria-hidden="true"></i>&nbsp; {{ phoneTypes[key].label }}</a>
          </li>
        </ul>
      </span>

    </div>
  `
});
