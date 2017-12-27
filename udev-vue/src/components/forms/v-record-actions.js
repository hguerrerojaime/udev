const Vue = require('vue').default;
const format = require('string-format');

Vue.component('v-record-actions', {
  props: {
    mode: {
      type: String,
      validator: function(value) {
          return ['read','write'].includes(value);
      }
    },
    recordId: String,
    editHref: {
      type: String
    },
    cloneHref: {
      type: String
    },
    cancelHref: {
      type: String
    },
    listHref: {
      type: String
    }
  },
  data: function() {
    return {
      actions: {
        read: [
          { type: 'link', icon: 'fa fa-pencil', brand: 'success', label: 'Edit', href: 'editHref' },
          { type: 'link', icon: 'fa fa-clone', brand: 'success', label: 'Clone', href: 'cloneHref' },
          { type: 'link', icon: 'fa fa-list', brand: 'default', label: 'List', href: 'listHref' }
        ],
        write: [
          { type: 'submit', icon: 'fa fa-save', brand: 'primary', label: 'Save' },
          { type: 'link', icon: 'fa fa-times', brand: 'default', label: 'Cancel', href: 'cancelHref' }
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
              <v-submit-button v-if="action.type === 'submit'"
                v-bind:label="action.label"
                v-bind:brand="action.brand"
                v-bind:icon="action.icon">
              </v-submit-button>
              <v-link-button v-if="action.type === 'link' && $props[action.href]"
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
