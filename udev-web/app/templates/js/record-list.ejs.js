const Vue = udev.Vue;

udev.boot();

var app = new Vue({
  el: "#app",
  data: {
    appInfo: appInfo,
    records: []
  },
  created: function() {
    this.loadRecordItems();
  },
  methods: {
    loadRecordItems: function() {
      udev.superagent.get('http://localhost:3001/employee').then((response) => {
        this.records = response.body;
      });
    }
  },
  template: `
  <v-admin-panel v-bind:app-info="appInfo">
    <v-panel title="Records List">
      <v-datatable v-model="records">
        <template slot="head">
          <v-dt-col-head field="id" label="Actions" class="actions-column"></v-dt-col-head>
          <% view.fields.forEach(function(field) { %>
          <v-dt-col-head field="<%=field.name%>" label="<%=field.label%>"></v-dt-col-head>
          <%}); %>
        </template>
        <td slot="id" slot-scope="rec">
          <div class="btn-group">
            <v-link-button icon="fa fa-pencil" v-bind:href="'?do=<%=view.domainObject.id%>&a=edit&id='+rec.value"></v-link-button>
          </div>
        </td>
        <% view.fields.forEach(function(field) { %>
        <td slot="<%=field.name%>" slot-scope="rec">
            {{ rec.value }}
        </td>
        <%}); %>
      </v-datatable>
    </v-panel>
  </v-admin-panel>
  `
});
