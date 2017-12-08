const TemplateController = require("./template-controller");

const uglify = require('uglify-es');

const JsController = TemplateController._extend({
  get contentType() {
    return "application/javascript";
  },
  get templatePrefix() {
    return "app/templates/js/";
  },
  get templateSuffix() {
    return ".ejs.js";
  },
  processResponseBody(responseBody) {
    return responseBody;
    //return uglify.minify(responseBody).code;
  }
});

module.exports = JsController;
