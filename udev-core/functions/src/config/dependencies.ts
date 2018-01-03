const admin = require('firebase-admin');

module.exports = {
  values: {
    db: admin.firestore()
  },
  controllers: {
    indexController: require('../controllers/IndexController').default,
    realmController: require('../controllers/RealmController').default,
    regionController: require('../controllers/RegionController').default,
    modelController: require('../controllers/ModelController').default
  },
  services: {
    realmService: require('../services/RealmService').default,
    regionService: require('../services/RegionService').default,
    modelService: require('../services/ModelService').default,
    pathResolver: require('../dao/PathResolver').default
  }
}
