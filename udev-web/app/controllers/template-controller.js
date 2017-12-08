const Controller = require("./controller");

const ejs = require('ejs');

const TemplateController = Controller._extend({
  get templatePrefix() {
    return null;
  },
  get templateSuffix() {
    return null;
  },
  loadTemplate(template,request,response,data) {

    let templateData = Object.assign({},data,{
      $request: request,
      $response: response
    });

    return new Promise((fullfill,reject) => {
      ejs.renderFile(`${this.templatePrefix}${template}${this.templateSuffix}`, templateData, function(err,text) {
        if (err) {
          reject(err);
        } else {
          fullfill(text);
        }
      });
    });
  },
  respond(actionPromise,request,response) {

    actionPromise.then((result) => {
      let isResultObjectType = typeof result === "object";
      let template = isResultObjectType ? result.template : result;
      let data = isResultObjectType ? result.data : {};

      this.loadTemplate(template,request,response,data).then((text) => {
        this.sendResponse(response,text);
      }).catch((err) => {
        console.error(err);
      });

    });
  }
});

module.exports = TemplateController;
