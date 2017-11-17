const Vue = require('vue').default;

const ALLOWED_TEXT_CASES = ['lower','upper','any'];

Vue.component('v-input-text', {
  props: {
    case: {
      type: String,
      default: "any",
      validator: function(value) {
          return ALLOWED_TEXT_CASES.includes(value);
      }
    },
    vModel: String
  },
  model: {
    prop: 'vModel',
    event: 'input'
  },
  methods: {
		updateValue(value) {

      let emmitingValue = value;

      if (value) {
        if (this.$props.case === "lower") {
          emmitingValue = value.toLowerCase();
        } else if (this.$props.case === "upper") {
          emmitingValue = value.toUpperCase();
        }
      }

			this.$emit('input', emmitingValue);
		}
	},
  template: `
    <input class="form-control" type="text" :value="vModel" @input="updateValue($event.target.value)" />
  `
});
