const JClass = require('jclass');

const RecordWriter = JClass._extend({

  init(datasource) {
    this.datasource = datasource;
  },

  async create(model,data = {}) {
    console.log(this.datasource);
    return await this.datasource.model(model).create(data);
  }
});

RecordWriter.$inject = ['datasource'];

module.exports = RecordWriter;
