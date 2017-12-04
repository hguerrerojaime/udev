const Vue = require('vue').default;

Vue.component('v-input-check', {
  props: {
    vModel: Boolean
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
    <div class="checkbox checbox-switch switch-primary">
        <label>
            <input type="checkbox" name="" :checked="vModel" v-on:change="updateValue($event.target.checked)">
            <span></span>
        </label>
    </div>
  `
});
