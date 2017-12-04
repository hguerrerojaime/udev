const Vue = require('vue').default;

const DATA_TYPES = require('../../types/index');

Vue.component('v-input-detail', {
  props: {
    vModel: Array
  },
  model: {
    prop: 'vModel',
    event: 'input'
  },
  created: function() {
    if (!this.$props.vModel) {
      this.updateValue([]);
    }
  },
  methods: {
		updateValue(value) {
			this.$emit('input', value);
		}
	},
  data: function() {

    let $this = this;

    //let allElements = [].concat.apply([],Object.keys($this.$slots).map(function(key) { return $this.$slots[key]; }));

    let allElements = $this.$slots.default;

    let columns = allElements
      .filter(function(s) { return s.componentOptions; })
      .map(function(s) { return s.componentOptions.propsData; });

    let newItemForm = {};


    return {
      fieldTypes: DATA_TYPES,
      columns: columns,
      newItemForm: newItemForm
    }
  },
  methods: {
    popupNewItemModal() {
      this.$refs.newItemModal.show();
    },
    submitNewItem(e) {
      if (e) {
        e.preventDefault();
      }

      this.$props.vModel.push(this.newItemForm);
      this.newItemForm = {};
      this.$refs.newItemModal.hide();
    }
  },
  template: `
    <div>
      <p>
        <v-button brand="success" icon="fa fa-plus" label="Add Item" size="sm" v-on:click="popupNewItemModal"></v-button>
        <v-modal title="New Item" ref="newItemModal">
         <form class="form-horizontal" v-on:submit="submitNewItem" ref="formElement">
          <v-form-group v-for="col in columns" :key="col.field" v-bind:label="col.label">
            <component v-bind:is="fieldTypes[col.type].components.input" v-model="newItemForm[col.field]" v-bind="col.fieldOpts"></component>
          </v-form-group>
         </form>
         <div slot="footer" class="pull-right">
          <v-button brand="primary" icon="fa fa-save" label="Save" v-on:click="submitNewItem"></v-button>
         </div>
        </v-modal>
      </p>

      <v-well v-if="vModel.length == 0" size="sm">No items added</v-well>
      <table v-else class="table table-condensed table-striped" style="font-size: 12px;">
        <thead>
          <tr>
            <th v-for="col in columns">{{ col.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in vModel">
            <td v-for="col in columns">
              <component v-bind:is="fieldTypes[col.type].components.output" v-model="item[col.field]"></component>
            </td>
          </tr>
        </tbody>
      </table>

      <slot v-if="false"></slot>

    </div>
  `
});
