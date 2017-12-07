const JClass = require("jclass");

const Controller = JClass._extend({
  get contentType() {
    return "text/plain";
  },
  setResponseContentType(response) {
    response.set('Content-Type', this.contentType);
  },
  processResponse(actionPromise,response) {
    actionPromise.then((actionResult) => response.send(actionResult));
  }
});
