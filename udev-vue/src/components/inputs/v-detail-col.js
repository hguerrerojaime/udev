const Vue = require('vue').default;

Vue.component('v-detail-col', {
  props: {
    value: {},
    field: String,
    type: String,
    label: String,
    fieldOpts: Object
  },
  model: {
    prop: 'vModel',
    event: 'input'
  },
  created: function() {
    if (!this.$props.vModel) {
      this.updateValue([]);
    }


  },
  methods: {
		updateValue(value) {
			this.$emit('input', value);
		}
	}
});
