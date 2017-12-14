const Controller = require('udev-mvc').controllers.Controller;

const RestController = Controller._extend({
  get contentType() {
    return "application/json";
  },
  respond(actionPromise,request,response) {
    actionPromise.then((result) => {
      response.json(result);
    }).catch((error)=> {
      response.status(500);
      response.json(error);
    });
  }

});

module.exports = RestController;
