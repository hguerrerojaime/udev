const Vue = require('vue').default;

Vue.component('v-input-text', {
  props: {
    textCase: {
      type: String,
      default: "any",
      validator: function(value) {
          return ['any','lower','upper','capital'].includes(value);
      }
    },
    vModel: String
  },
  model: {
    prop: 'vModel',
    event: 'input'
  },
  data: function() {
    return {
      textCaseConfig: {
        any:  {
          transform: function(value) {
            return value;
          },
          css: ""
        },
        lower: {
          transform: function(value) {
            return value.toLowerCase();
          },
          css: "text-transform: lowercase;"
        },
        upper: {
          transform: function(value) {
            return value.toUpperCase();
          },
          css: "text-transform: uppercase;"
        },
        capital: {
          transform: function(value) {
            return value.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
          },
          css: "text-transform: capitalize;"
        }
      }
    }
  },
  created: function() {
    this.updateValue(this.$props.vModel);
  },
  methods: {
		updateValue(value) {


      let emitingValue = undefined;
      if (value) {
        emitingValue = this.textCaseConfig[this.$props.textCase].transform(value);
      }

			this.$emit('input', emitingValue);
		}

	},
  template: `
    <input v-bind:style="textCaseConfig[textCase].css" class="form-control" type="text" :value="vModel" @input="updateValue($event.target.value)" />
  `
});
