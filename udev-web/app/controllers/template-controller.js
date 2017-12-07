const Controller = require("./controller");

const TemplateController = Controller._extend({
  get templatePrefix() {
    return null;
  },
  get templateSuffix() {
    return null;
  },
  renderTemplate(template,data) {
    return new Promise((fullfill,reject) => {
      ejs.renderFile(`${this.templatePrefix}${template}${this.templateSuffix}`, data, function(err,text) {
        if (err) {
          reject(err);
        } else {
          fullfill(text);
        }
      });
    });
  },
  processResponse(actionPromise,response) {

    actionPromise.then((result) => {

      let isResultObjectType = typeof result === "object";

      let template = isResultObjectType ? result.template : result;
      let data = isResultObjectType ? result.data : {};


    });

  }
});
