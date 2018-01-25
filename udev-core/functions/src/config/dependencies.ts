const admin = require('firebase-admin');

module.exports = {
  values: {
    db: admin.firestore()
  },
  controllers: {
    indexController: require('../controllers/IndexController').default,
    realmController: require('../controllers/RealmController').default,
    regionController: require('../controllers/RegionController').default,
    modelController: require('../controllers/ModelController').default,
    userController: require('../controllers/UserController').default
  },
  services: {
    realmDAO: require('../dao/RealmDAO').default,
    userDAO: require('../dao/UserDAO').default,
    userRealmDAO: require('../dao/UserRealmDAO').default,
    realmService: require('../services/RealmService').default,
    regionService: require('../services/RegionService').default,
    modelService: require('../services/ModelService').default,
    userService: require('../services/UserService').default,
    recordAuditor: require('../core/RecordAuditor').default
  },
  factories: {
    regionDAOFactory: (context) => {
      const RegionDAO = require('../dao/RegionDAO').default;
      return (realmId) => {
        return new RegionDAO(
          context.container.get('db'),
          context.container.get('recordAuditor'),
          context.container.get('realmDAO'),
          realmId
        );
      };
    },
    userRegionDAOFactory: (context) => {
      const UserRegionDAO = require('../dao/UserRegionDAO').default;
      return (realmId) => {
        return new UserRegionDAO(
          context.container.get('db'),
          context.container.get('recordAuditor'),
          context.container.get('realmDAO'),
          realmId
        );
      };
    },
    modelDAOFactory: (context) => {
      const ModelDAO = require('../dao/ModelDAO').default;
      return (realmId,regionId) => {
        return new ModelDAO(
          context.container.get('db'),
          context.container.get('recordAuditor'),
          context.container.get('regionDAOFactory'),
          realmId,
          regionId
        );
      };
    }
  }
}
