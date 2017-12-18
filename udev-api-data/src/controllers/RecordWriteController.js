const RestController = require('./RestController');

const RecordWriteController = RestController._extend({
  init(recordWriter) {
    this.recordWriter = recordWriter;
  },
  async create(modelId,$request) {
    let record = await this.recordWriter.create({ modelId: modelId, data: $request.body });

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
