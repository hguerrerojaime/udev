const Vue = require('vue').default;

require('datatables-bootstrap');

Vue.component('v-datatable', {
  props: {
    vModel: [Array,Promise]
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
      items: [],
      columns: [],
      flags: {
        loaded: false
      }
    }
  },
  watch: {
    vModel: function(val) {
      if (this.isArray) {
        this.items = val;

        $(this.$refs.table).DataTable().destroy();
        $(this.$refs.table).hide();
        this.flags.loaded = false;
        setTimeout(() => {
          this.flags.loaded = true;
          $(this.$refs.table).fadeIn();
          $(this.$refs.table).DataTable({});
        },0);
      } else if (this.isPromise) {

        $(this.$refs.table).DataTable().destroy();
        $(this.$refs.table).hide();
        this.flags.loaded = false;
        val.then(items => {
          this.flags.loaded = true;
          this.items = items;
          if (this.items.length > 0) {
            $(this.$refs.table).fadeIn();
            setTimeout(() => {
              $(this.$refs.table).DataTable({});
            },0);
          } else {
              $(this.$refs.table).hide();
          }
        });
      }
    }
  },
  mounted: function() {

    this.loadColumns();

    if (this.isArray) {
      this.items = this.$props.vModel;
      this.flags.loaded = true;

      if (this.items.length > 0) {
        setTimeout(() => {
          $(this.$refs.table).DataTable({});
        },0);
      } else {
          $(this.$refs.table).hide();
      }

    } else if (this.isPromise) {
      this.props.vModel.then(items => {
        this.flags.loaded = true;
        this.items = items;
        if (this.items.length > 0) {
          setTimeout(() => {
            $(this.$refs.table).DataTable({});
          },0);
        } else {
            $(this.$refs.table).hide();
        }
      });
    }
  },
  computed: {
    isArray() {
      return this.$props.vModel instanceof Array;
    },
    isPromise() {
      return this.$props.vModel instanceof Promise;
    }
  },
  template: `
    <div>
      <table ref="table" class="table table-condensed table-striped" style="font-size:13px;">
        <thead>
          <tr>
            <slot name="head"></slot>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rec in items">
            <slot v-for="col in columns" :name="col.field" :instance="rec" :value="rec[col.field]"></slot>
          </tr>
        </tbody>
      </table>
      <v-well size="sm" v-if="!flags.loaded">
        Loading...
      </v-well>
      <v-well size="sm" v-if="flags.loaded && items.length == 0">
        No records found
      </v-well>
    </div>
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
