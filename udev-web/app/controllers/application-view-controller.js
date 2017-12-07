const ViewController = require("./view-controller");

const ApplicationViewController = ViewController._extend({
  init(appBuilder) {
    this.appBuilder = appBuilder;
  },
  async index($response) {

    $response.redirect('/hr');

  },
  async appIndex($request) {

    let action = $request.query.a || "index";
    let domainObject = $request.query.do;

    console.log("AAAA");
    console.log($request.params.app);

    let applications = await this.appBuilder.getAvailableApplications();
    let currentApplication = await this.appBuilder.getApplication($request.params.app);

    return {
      template: 'index',
      data: {
        applications: applications.map((app) => { return { id:app.id, name: app.name } }),
        application: currentApplication,
        domainObject: domainObject,
        action: action
      }
    };
  },
  async test($request) {
    return $request;
  }
});

ApplicationViewController.$inject = ['appBuilder'];

module.exports = ApplicationViewController;
