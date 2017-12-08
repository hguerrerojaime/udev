const Vue = require('vue').default;

require('datatables-bootstrap');

Vue.component('v-datatable', {
  props: {
    vModel: Array
  },
  model: {
    prop: 'vModel',
    event: 'input'
  },
  created: function() {
    if (!this.$props.vModel) {
      this.$emit('input',[]);
    }
  },
  methods: {
    loadColumns: function() {
      let columns = this.$children.map(function(child) {
        return {
          field: child.$props.field,
          label: child.$props.label
        };
      });
      this.columns = columns;
    }
  },
  data: function() {
    return {
      columns: []
    }
  },
  mounted: function() {
    this.loadColumns();
    console.log(this.$el);
    // $(this.$el).DataTable({});
  },
  template: `
    <table class="table table-condensed table-striped" style="font-size:12px;">
      <thead>
        <tr>
          <slot name="head"></slot>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rec in vModel" ref="aaa">
          <slot v-for="col in columns" :name="col.field" :instance="rec" :value="rec[col.field]"></slot>
        </tr>
      </tbody>
    </table>
  `
});

Vue.component('v-dt-col-head', {
  props: {
    field: String,
    label: String
  },
  data: function() {
    return {
      value: "a"
    }
  },
  template: `
    <th>{{ label }}</th>
  `
});
