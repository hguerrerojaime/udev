const Vue = require('vue').default;

Vue.component('v-input-detail', {
  props: {
    vModel: Array
  },
  model: {
    prop: 'vModel',
    event: 'input'
  },
  methods: {
		updateValue(value) {
			this.$emit('input', value);
		}
	},
  template: `
    <div>
      <div>
        <v-button brand="success" icon="fa fa-plus" label="Add Item" size="sm"></v-button>
      </div>
    </div>
  `
});
