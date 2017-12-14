const JClass = require('jclass');

const RecordWriter = JClass._extend({

  init(dataSource) {
    this.dataSource = dataSource;
  },

  async create(model,data = {}) {
    return await this.dataSource.model(model).create(data).meta({fetch:true});
  }
});

RecordWriter.$inject = ['dataSource'];

module.exports = RecordWriter;
