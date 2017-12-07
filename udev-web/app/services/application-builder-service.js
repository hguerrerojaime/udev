const JClass = require("jclass");

const ApplicationBuilderService = JClass._extend({
  init(superagent = require('superagent')) {
    this.superagent = superagent;
  },
  getAvailableApplications() {
    return this.superagent.get(`http://localhost:3001/application`).then((response) => {
      return response.body;
    }).catch(() => {
      console.error("could not get the available applications");
    });
  },
  getApplication(id) {
    return this.superagent.get(`http://localhost:3001/application/${id}`).then((response) => {
      return response.body;
    }).catch(() => {
      console.error("could not get the application");
    })
  },
  getLayout(id) {
    return this.superagent.get(`http://localhost:3001/layout/${id}`).then((response) => {
      return response.body;
    }).catch(() => {
      console.error("could not get layout");
    })
  }
});

module.exports = ApplicationBuilderService;
