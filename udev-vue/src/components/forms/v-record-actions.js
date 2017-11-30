const Vue = require('vue').default;

Vue.component('v-record-actions', {
  props: {
    mode: {
      type: String,
      validator: function(value) {
          return ['read','write'].includes(value);
      }
    },
    recordId: String
  },
  data: function() {
    return {
      actions: {
        read: [
          { type: 'link', icon: 'fa fa-pencil', brand: 'success', label: 'Edit' },
          { type: 'link', icon: 'fa fa-clone', brand: 'success', label: 'Clone' },
          { type: 'link', icon: 'fa fa-list', brand: 'default', label: 'List' }
        ],
        write: [
          { type: 'submit', icon: 'fa fa-save', brand: 'primary', label: 'Save' },
          { type: 'link', icon: 'fa fa-times', brand: 'default', label: 'Cancel' }
        ]
      }
    };
  },
  template: `
    <v-div-row>
      <v-div-col>
        <v-well size="sm">
          <ul class="navlist">
            <li v-for="action in actions[mode]">
              <v-button v-if="action.type === 'submit'"
                v-bind:label="action.label"
                v-bind:brand="action.brand"
                v-bind:icon="action.icon">
              </v-button>
              <v-link-button v-if="action.type === 'link'"
                v-bind:label="action.label"
                v-bind:brand="action.brand"
                v-bind:icon="action.icon">
              </v-link-button>
            </li>
          </ul>
        </v-well>
      </v-div-col>
    </v-div-row>
  `
});
