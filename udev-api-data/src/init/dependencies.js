module.exports = {
  values: {
    mongoose: require('mongoose')
  },
  controllers: {
    indexController: require('../controllers/IndexController'),
    recordWriteController: require('../controllers/RecordWriteController'),
    recordReadController: require('../controllers/RecordReadController'),
    viewController: require('../controllers/ViewController')
  },
  services: {
    recordWriter: require('../services/RecordWriter'),
    recordReader: require('../services/RecordReader'),
    dataSourceFactory: require('../core/DataSourceFactory'),
    modelManagerFactory: require('../core/ModelManagerFactory'),
    repositoryFactory: require('../core/RepositoryFactory'),
    realmApi: require('../services/RealmApi'),
    modelService: require('../services/ModelService'),
    viewService: require('../services/ViewService')
  }
};
