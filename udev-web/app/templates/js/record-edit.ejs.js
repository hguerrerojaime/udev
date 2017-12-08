const Vue = udev.Vue;

udev.boot();

var app = new Vue({
  el: "#app",
  data: {
    form: <%- JSON.stringify(formData) %>,
    fieldOptions: <%- JSON.stringify(fieldOptions) %>,
    appInfo: appInfo
  },
  created: function() {
    <% if (recId) { %>
    this.loadRecord("<%=recId%>")
    <% } %>
  },
  methods: {
    <% if (recId) { %>
    loadRecord: function(id) {
      udev.superagent.get(`http://localhost:3001/employee/${id}`).then((response) => {
        console.log(response.body);
        this.form = response.body;
      });
    },
    <% } %>
    submit: function(e) {
      e.preventDefault();

      this.$spinner.show();

      console.log(this.form);

      setTimeout(()=> e.target.submit(), 2000);
    }
  },
  template: `
  <v-admin-panel v-bind:app-info="appInfo">
    <v-panel title="Dashboard">
        <v-record-form action="<%=$request.url%>" method="GET" v-on:submit="submit">
          <% layout.sections.forEach(function(section) { %>
             <v-div-row>
          <% section.columns.forEach(function(column) { %>
             <v-div-col v-bind:width="<%= (12 / section.columns.length) %>">
          <% column.components.forEach(function(component) { %>
               <v-form-group label="<%= component.label %>">
                 <component
                    v-bind:is="$config.dataTypes['<%=component.type%>'].components.input"
                    v-model="form.<%=component.field%>"
                    v-bind="fieldOptions['<%=component.field%>']"
                 ></component>
               </v-form-group>
          <% }); %>
              </v-div-col>
          <% }); %>
            </v-div-row>
          <% }); %>
        </v-record-form>
      </v-panel>
      <v-modal title="Confirm" ref="modal">
        <li slot="props"></li>
      </v-modal>
  </v-admin-panel>
  `
});
