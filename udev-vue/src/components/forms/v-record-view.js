const Vue = require('vue').default;

Vue.component('v-record-form', {
  props: {
    oritentation: {
      type: String,
      default: "horizontal",
      validator: function(value) {
          return ['vertical','horizontal'].includes(value);
      }
    },
    recordId: String
  },
  template: `
    <div v-bind:class="'form form-'+oritentation">
      <v-record-actions mode="read" v-bind:record-id="recordId"></v-record-actions>
      <v-div-row>
        <v-div-col>
          <div class="form-container">
            <slot></slot>
          </div>
        </v-div-col>
      </v-div-row>
      <v-record-actions mode="write" v-bind:record-id="recordId"></v-record-actions>
    </div>
  `
});
