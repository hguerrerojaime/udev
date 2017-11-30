require('./components/index');
const Vue = require('vue').default;
const moment = require('moment');

var app = new Vue({
  el: "#app",
  template: `
    <div>
      <v-top-bar></v-top-bar>
      <v-side-bar></v-side-bar>
      <v-body>
        <v-panel title="Dashboard">
          <v-record-form>
            <v-div-row>
             <v-div-col v-bind:width="6">
               <v-form-group label="Name">
                 <v-input-text v-model="name" textCase="upper"></v-input-text>
               </v-form-group>
               <v-form-group label="Birth Date">
                 <v-input-date v-model="date"></v-input-date>
               </v-form-group>
               <v-form-group label="Date Range">
                 <v-input-date-range v-model="dateRange"></v-input-date-range>
               </v-form-group>
               <v-form-group label="Check">
                 <v-input-check v-model="bool"></v-input-check>
               </v-form-group>
               <v-form-group label="Language">
                 <v-input-select
                    v-model="languaje"
                    v-bind:items="['Spanish','English','French','Italian']"
                    v-bind:enable-input="true"
                  ></v-input-select>
               </v-form-group>
              </v-div-col>
              <v-div-col v-bind:width="6">
                <v-form-group label="Phone">
                  <v-input-phone v-model="phone"></v-input-phone>
                </v-form-group>
                <v-form-group label="Technologies">
                  <v-input-multiselect
                      v-model="technologies"
                      v-bind:items="['Java','C#','Ruby','Javascript']"
                      v-bind:enable-input="true"
                  ></v-input-multiselect>
                </v-form-group>
              </v-div-col>
            </v-div-row>
          </v-record-form>
        </v-panel>
      </v-body>
    </div>
  `,
  data: {
    name: "Humberto Guerrero",
    date: moment().add(1,'days'),
    dateRange: {
      start: moment(),
      end: moment()
    },
    bool: true,
    languaje: "Spanish",
    phone: undefined,
    technologies: undefined
  },
  methods: {
    submit: function() {
      console.log(this.$data);
    }
  }
});

module.exports = app;
