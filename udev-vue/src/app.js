require('./components/index');

const Vue = require('vue').default;

var app = new Vue({
  el: "#app",
  template: `
    <div>
      <v-top-bar></v-top-bar>
      <v-side-bar></v-side-bar>
      <v-body>
        <v-panel title="Dashboard">
          <form class="form-horizontal">
             <v-form-group label="Name">
               <v-input-text v-model="name"></v-input-text>
             </v-form-group>
             <v-form-group label="Birth Date">
               <v-input-date></v-input-date>
             </v-form-group>

          </form>


          <v-button label="Save" brand="primary" icon="fa fa-floppy-o"></v-button>
        </v-panel>
      </v-body>
    </div>
  `,
  data: {
    name: "Humberto Guerrero"
  }
});

module.exports = app;
