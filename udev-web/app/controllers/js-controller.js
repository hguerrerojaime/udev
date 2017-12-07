const TemplateController = require("./template-controller");

const JsController = TemplateController._extend({
  get contentType() {
    return "application/javascript";
  },
  get templatePrefix() {
    return "app/templates/js/";
  },
  get templateSuffix() {
    return ".ejs.js";
  }
});
