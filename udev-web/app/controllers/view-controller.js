const TemplateController = require("./template-controller");

const ViewController = TemplateController._extend({
  get contentType() {
    return "text/HTML";
  },
  get templatePrefix() {
    return "app/templates/html/";
  },
  get templateSuffix() {
    return ".ejs.html";
  }
});

module.exports = ViewController;
