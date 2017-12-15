module.exports = {
  values: {
    mongoose: require('mongoose')
  },
  controllers: {
    indexController: require('../controllers/IndexController'),
    recordWriteController: require('../controllers/RecordWriteController'),
    recordViewController: require('../controllers/RecordViewController')
  },
  services: {
    recordWriter: require('../services/RecordWriter'),
    recordViewer: require('../services/RecordViewer'),
    dataSourceFactory: require('../core/DataSourceFactory'),
    modelManagerFactory: require('../core/ModelManagerFactory'),
    realmApi: require('../services/RealmApi')
  }
};
