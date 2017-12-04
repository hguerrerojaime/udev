const Vue = require('vue').default;

require('select2');

Vue.component('v-input-multiselect', {
  props: {
    vModel: Array,
    items: {
      type: Array,
      default: []
    },
    enableInput: {
      type: Boolean,
      default: false
    }
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

    let inputSelect = $(this.$el).select2({
      tags: $this.$props.enableInput
    });

    inputSelect.on('change',function(e) {
      $this.updateValue(inputSelect.select2('val'));
    });
  },
  template: `
    <select id="cool" class="form-control" multiple>
      <option v-for="item in items" v-bind:value="item">{{item}}</option>
    </select>
  `
});
