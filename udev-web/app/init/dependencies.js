module.exports = {
  values: {

  },
  factories: {
    applicationViewController: require('../controllers/application-view-controller'),
    applicationJsController: require('../controllers/application-js-controller'),
  },
  services: {
    appBuilder: require('../services/application-builder-service'),
    requestProcessor: require('../core/request-processor')
  }
};
