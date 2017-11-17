const Vue = require('vue').default;

require('bootstrap-datepicker');

Vue.component('v-input-date', {
  props: {
    vModel: String
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
  mounted: function() {
    $(this.$el).datepicker({
        autoclose: true
    });
  },
  template: `
  <div class="input-group date">
    <input class="form-control" type="text" :value="vModel" @input="updateValue($event.target.value)" />
    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
  </div>

  `
});
