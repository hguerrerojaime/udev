const JClass = require('jclass');
const Repository = require('../core/Repository');
const modelUtils = require('../util/index').modelUtils;

const viewModel = require('../models/view');

const ViewService = JClass._extend({
  init(modelService) {
    this.modelService = modelService;
  },

  async loadViewModel(modelId) {
    return await this.modelService.loadSystemModel({
      modelId: modelId,
      systemModel: "View",
      schema: viewModel
    });
  },

  async createView(options = {}) {
    let View = await this.loadViewModel(options.modelId);

    let data = Object.assign({},{
      query: {
        filter: {},
        sort: {},
        select: {}
      }
    },options.data,{
      model: options.modelId
    });

    let view = new View(data);
    return modelUtils.promisefy(view,view.save);
  },

  async getView(options = {}) {
    let View = await this.loadViewModel(options.modelId);
    return modelUtils.promisefy(View,View.findById,[options.id]);
  },

  async listViews(options = {}) {
    let View = await this.loadViewModel(options.modelId);
    return modelUtils.promisefy(View,View.find,[{ model: options.modelId }]);
  }

});

ViewService.$inject = ['modelService'];

module.exports = ViewService;
