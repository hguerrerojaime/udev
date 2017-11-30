const Vue = require('vue').default;
const moment = require('moment');
const format = require('string-format');;
require('bootstrap-daterangepicker');



Vue.component('v-input-date-range', {
  props: {
    vModel: Object,
    displayFormat: {
      type: String,
      default: "From: [{start}] To: [{end}]"
    },
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
    vModel: function(newValue) {
      this.dateText = format(this.$props.displayFormat,{
        start: newValue.start.format(this.$props.format),
        end: newValue.end.format(this.$props.format)
      });

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
      $this.dateText = format(this.$props.displayFormat,{
        start: this.$props.vModel.start.format(this.$props.format),
        end: this.$props.vModel.end.format(this.$props.format)
      });
    }

    $(this.$el).daterangepicker({
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, function(start, end, label) {

      let value = undefined;

      if (start && end) {
        value = {
          start: start,
          end: end
        };


      }

      $this.updateValue(value);


    });
  },
  template: `
  <div class="form-control" style="cursor: pointer;">
      <span>{{ dateText }}</span>
      <div class="pull-right">
      <i class="fa fa-calendar"></i>&nbsp;
       <b class="caret"></b>
      </div>
  </div>

  `
});
