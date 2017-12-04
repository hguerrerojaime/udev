const Vue = require('vue');


var app = new Vue({
  el: "#app",
  data: {
    form: {
      name: "Humberto Guerrero"
    },
    menuItems: [
      { icon: "fa fa-dashboard", href:"/", label: "Dashboard" },
      { icon: "fa fa-user", href:"/", label: "Users" }
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
  <v-admin-panel v-bind:menu-items="menuItems">
    <v-panel title="Dashboard">
        <v-record-form v-on:submit="submit">
          <v-div-row>
           <v-div-col>
             <v-form-group label="Name">
               <component is="v-input-text" v-model="form.name" text-case="upper"></component>
             </v-form-group>
            </v-div-col>
          </v-div-row>
        </v-record-form>
      </v-panel>
      <v-modal title="Confirm" ref="modal">
        <li slot="props"></li>
      </v-modal>
  </v-admin-panel>
  `
});

module.exports = app;
