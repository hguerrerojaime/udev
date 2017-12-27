const admin = require('firebase-admin');
module.exports = {
    values: {
        db: admin.firestore()
    },
    controllers: {
        indexController: require('../controllers/IndexController').default,
        realmController: require('../controllers/RealmController').default,
        regionController: require('../controllers/RegionController').default
    },
    services: {
        realmService: require('../services/RealmService').default,
        regionService: require('../services/RegionService').default
    }
};
//# sourceMappingURL=dependencies.js.map