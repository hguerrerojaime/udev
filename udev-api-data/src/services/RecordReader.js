const JClass = require('jclass');
const Repository = require('../core/Repository');
const modelUtils = require('../util/index').modelUtils;

const RecordReader = JClass._extend({

  init(modelService,viewService) {
    this.modelService = modelService;
    this.viewService = viewService;
  },

  async get(options = {}) {
    let Model = await this.modelService.getModel(options);
    return await modelUtils.promisefy(Model,Model.findById,[options.id]);
  },

  async list(options = {}) {

    let query = {};
    let view = await this.viewService.getView({ modelId: options.modelId, id: options.viewId  });

    console.log(view);

    if (view) {
      query = view.query;
    }

    let Model = await this.modelService.getModel(options);
    return await modelUtils.promisefy(Model,Model.find,[query.filter]);
  }
});

RecordReader.$inject = ['modelService','viewService'];

module.exports = RecordReader;
