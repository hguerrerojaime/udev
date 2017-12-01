const Vue = require('vue').default;

require('jquery-mask-plugin');

Vue.component('v-input-number', {
  props: {
    vModel: Number
  },
  model: {
    prop: 'vModel',
    event: 'input'
  },
  methods: {
		updateValue(value) {

      let emitingValue = undefined;

      if (value) {
        emitingValue = value
      }

			this.$emit('input', emitingValue);
		}
	},
  mounted: function() {
    let $this = this;

    $(this.$el).mask('#',{
      onChange: function(value) {
        $this.updateValue(Number(value));
      }
    });
  },
  template: `
    <input class="form-control" type="number" :value="vModel" />
  `
});
