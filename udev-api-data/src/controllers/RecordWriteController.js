const RestController = require('./RestController');

const RecordWriteController = RestController._extend({
  init(recordWriter) {
    this.recordWriter = recordWriter;
  },
  async create($request) {
    console.log(this.recordWriter.create);
    let record = await this.recordWriter.create('post',$request.body);
    console.log(record);
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
