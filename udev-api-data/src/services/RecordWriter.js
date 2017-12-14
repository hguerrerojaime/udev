const JClass = require('jclass');

const RecordWriter = JClass._extend({

  init(dataSourceFactory) {
    this.dataSourceFactory = dataSourceFactory;
  },

  create(model,data = {}) {

    return new Promise((fullfill,reject) => {

      this.dataSourceFactory.createDataSource({
        callback: (dataSource) => {
          dataSource.model(model).create(data).meta({fetch:true}).then((record) => {
            fullfill(record);
          });
        }
      });

    });

  }
});

RecordWriter.$inject = ['dataSourceFactory'];

module.exports = RecordWriter;
