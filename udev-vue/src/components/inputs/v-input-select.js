const Vue = require('vue').default;

require('select2');

Vue.component('v-input-select', {
  props: {
    vModel: String,
    items: {
      type: Array,
      default: []
    },
    enableInput: {
      type: Boolean,
      default: false
    },
    select2: {
      type: Boolean,
      default: true
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

    let inputSelect = $(this.$el);

    if ($this.$props.select2) {
      inputSelect.select2({
        tags: $this.$props.enableInput
      });
    }

    inputSelect.on('change',function() {
      $this.updateValue(this.value);
    });
  },
  template: `
    <select class="form-control" :value="vModel">
      <option v-for="item in items" v-bind:value="item">{{item}}</option>
    </select>
  `
});
