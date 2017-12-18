const RestController = require('./RestController');

const RecordReadController = RestController._extend({
  init(recordReader) {
    this.recordReader = recordReader;
  },
  async show(modelId,id) {
    let record = await this.recordReader.get({ modelId:modelId, id: id });
    return record;
  },

  async list(modelId, $request) {
    let viewId = $request.query.v;
    let list = await this.recordReader.list({ modelId: modelId, viewId: viewId });
    return list;
  }
});

RecordReadController.$inject = ['recordReader'];

module.exports = RecordReadController;
