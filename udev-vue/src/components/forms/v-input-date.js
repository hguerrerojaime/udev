const Vue = require('vue').default;
const moment = require('moment');
require('bootstrap-daterangepicker');



Vue.component('v-input-date', {
  props: {
    vModel: Object,
    format: {
      type: String,
      default: "YYYY-MM-DD"
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
  watch: {
    vModel: function(newDate) {
      this.dateText = newDate.format(this.$props.format);
    }
  },
  data: function() {
    return {
      dateText:undefined
    }
  },
  mounted: function() {

    let $this = this;

    if (this.$props.vModel) {
      $this.dateText = this.$props.vModel.format(this.$props.format);;
    }

    $(this.$el).daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      startDate: $this.$props.vModel
    }, function(start, end, label) {
      $this.updateValue(start);
    });
  },
  template: `
  <div class="input-group date">
    <input class="form-control" type="text" v-model="dateText" />
    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
  </div>

  `
});
