const RestController = require('./RestController');

const RecordWriteController = RestController._extend({
  init(recordWriter) {
    this.recordWriter = recordWriter;
  },
  async create($request) {
    let record = await this.recordWriter.create('post',$request.body);

    return record;
  },
  async update($request) {
    return {};
  },
  async delete($request) {
    return {};
  }
});

RecordWriteController.$inject = ['recordWriter'];

module.exports = RecordWriteController;
