require('./components/index');
const Vue = require('vue').default;
const moment = require('moment');

const $spinner = require('./utils/spinner').default;

var app = new Vue({
  el: "#app",
  data: {
    form: {
      name: "Humberto Guerrero",
      date: moment().add(1,'days'),
      dateRange: {
        start: moment(),
        end: moment()
      },
      bool: true,
      languaje: "Spanish",
      phone: undefined,
      technologies: undefined,
      number: 10,
      details: []
    },
    menuItems: [
      { icon: "fa fa-dashboard", href:"/", label: "Dashboard" },
      { icon: "fa fa-user", href:"/", label: "Users" }
    ]
  },
  //mounted: $spinner.hide,
  methods: {
    submit: function(e) {
      e.preventDefault();

      console.log(this.$data);
      $spinner.show();

      setTimeout(()=> $spinner.hide(), 2000);
    }
  },
  template: `
  <v-admin-panel v-bind:menu-items="menuItems">
    <v-panel title="Dashboard">
        <v-record-form v-on:submit="submit">
          <v-div-row>
           <v-div-col v-bind:width="6">
             <v-form-group label="Name">
               <component is="v-input-text" v-model="form.name" text-case="upper"></component>
             </v-form-group>
             <v-form-group label="Birth Date">
               <v-input-date v-model="form.date"></v-input-date>
             </v-form-group>
             <v-form-group label="Date Range">
               <v-input-date-range v-model="form.dateRange"></v-input-date-range>
             </v-form-group>
             <v-form-group label="Check">
               <v-input-check v-model="form.bool"></v-input-check>
             </v-form-group>
             <v-form-group label="Language">
               <v-input-select
                  v-model="form.languaje"
                  v-bind:items="['Spanish','English','French','Italian']"
                  v-bind:enable-input="true"
                ></v-input-select>
             </v-form-group>
            </v-div-col>
            <v-div-col v-bind:width="6">
              <v-form-group label="Phone">
                <v-input-phone v-model="form.phone"></v-input-phone>
              </v-form-group>
              <v-form-group label="Technologies">
                <v-input-multiselect
                    v-model="form.technologies"
                    v-bind:items="['Java','C#','Ruby','Javascript']"
                    v-bind:enable-input="true"
                ></v-input-multiselect>
              </v-form-group>
              <v-form-group label="Number">
                <v-input-number
                    v-model="form.number"
                ></v-input-number>
              </v-form-group>
              <v-form-group label="Details">
                <v-input-detail
                    v-model="form.details"
                >
                  <v-detail-col
                    field="name"
                    type="text"
                    label="Name"
                    v-bind:field-opts="{ textCase: 'upper' }"
                  ></v-detail-col>
                  <v-detail-col
                    field="phone"
                    type="phone"
                    label="Phone Number"
                  ></v-detail-col>
                </v-input-detail>
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
