const JClass = require('jclass');

const DataSource = require('./DataSource');

const DataSourceFactory = JClass._extend({

  createDataSource(options = {}) {
    return new DataSource(options);
  }

});

module.exports = DataSourceFactory;
