
const Vue = require('vue').default;
const moment = require('moment');

var app = new Vue({
  el: "#app",
  data: {
    form: {
      name: "Humberto Guerrero"
    },
    appInfo: {
      menuItems: [
        { icon: "fa fa-dashboard", href:"/", label: "Dashboard" },
        { icon: "fa fa-user", href:"/", label: "Users" }
      ],
      applications: []
    },
    records: [
      { name: "Beto", profession: "Architect" },
      { name: "Mauro", profession: "Footballer" }
    ]
  },
  methods: {
    submit: function(e) {
      e.preventDefault();

      this.$spinner.show();

      setTimeout(()=> e.target.submit(), 2000);
    }
  },
  template: `
  <v-admin-panel v-bind:app-info="appInfo">
    <v-panel title="Dashboard">
      <v-datatable v-model="records">
        <template slot="head">
          <v-dt-col-head field="id" label="Actions" class="actions-column"></v-dt-col-head>
          <v-dt-col-head field="name" label="Name"></v-dt-col-head>
          <v-dt-col-head field="profession" label="Profession"></v-dt-col-head>
        </template>
        <td slot="id" slot-scope="rec">
          <div class="btn-group">
            <v-button icon="fa fa-search"></v-button>
            <v-button icon="fa fa-pencil"></v-button>
            <v-button icon="fa fa-close"></v-button>
          </div>
        </td>
        <td slot="name" slot-scope="rec">
            {{ rec.value }}
        </td>
        <td slot="profession" slot-scope="rec">
            {{ rec.value }}
        </td>
      </v-datatable>
    </v-panel>
  </v-admin-panel>
  `
});

module.exports = app;
