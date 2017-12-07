const JsController = require("./js-controller");

const ApplicationJsController = JsController._extend({
  init(appBuilder) {
    this.appBuilder = appBuilder;
  },
  async index($request) {
    return 'index';
  },
  async edit($request) {
    let layout = await this.appBuilder.getLayout($request.query.do);
    return {
      template: 'edit',
      data: {
        formData: buildFormData(layout),
        fieldOptions: buildFieldOptions(layout),
        layout: layout
      }
    };
  }
});

ApplicationJsController.$inject = ['appBuilder'];
module.exports = ApplicationJsController;

function getAllLayoutComponents(layout) {
  return [].concat.apply([],layout.sections.map((section) => {
    return [].concat.apply([],section.columns.map((column) => {
      return [].concat.apply([],column.components);
    }));
  }));
}
function buildFieldOptions(layout) {
  let allComponents = getAllLayoutComponents(layout);
  let result = {};
  allComponents.forEach((component) => {
    let fieldOpts = component.fieldOptions;
    if (!fieldOpts) {
      fieldOpts = {};
    }
    result[component.field] = fieldOpts;
  });
  return result;
}
function buildFormData(layout) {
  let allComponents = getAllLayoutComponents(layout);
  let result = {};
  allComponents.forEach((component) => {
    result[component.field] = null;
  });
  return result;
}
