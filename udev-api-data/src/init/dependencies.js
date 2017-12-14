module.exports = {
  values: {

  },
  controllers: {
    indexController: require('../controllers/IndexController'),
    recordWriteController: require('../controllers/RecordWriteController')
  },
  services: {
    recordWriter: require('../services/RecordWriter'),
    dataSourceFactory: require('../core/DataSourceFactory')
  }
};
