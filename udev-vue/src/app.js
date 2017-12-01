require('./components/index');
const Vue = require('vue').default;
const moment = require('moment');

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
  methods: {
    submit: function(e) {
      e.preventDefault();

      console.log(this.$data);
      e.target.submit();
    }
  }
});

module.exports = app;
