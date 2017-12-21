const JClass = require('jclass');
const Repository = require('../core/Repository');
const modelUtils = require('../util/index').modelUtils;

const RecordWriter = JClass._extend({

  init(modelService) {
    this.modelService = modelService;
  },

  async create(options = {}) {
    let Model = await this.modelService.getModel(options);
    let modelInstance = new Model(options.data);
    return await modelUtils.promisefy(modelInstance,modelInstance.save);
  }
});

RecordWriter.$inject = ['modelService'];

module.exports = RecordWriter;
