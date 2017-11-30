const Vue = require('vue').default;

require('jquery-mask-plugin');

Vue.component('v-input-phone', {
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
    let $this = this;

    $(this.$el).find('input').mask('(000) 000-0000',{
      onChange: function(value) {
        $this.updateValue(value);
      }
    });
  },
  template: `
    <div class="input-group">
      <input class="form-control" type="text" :value="vModel" />
      <span class="input-group-addon"><i class="fa fa-phone"></i></span>
    </div>
  `
});
