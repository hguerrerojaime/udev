const JClass = require('jclass');
const Repository = require('../core/Repository');
const modelUtils = require('../util/index').modelUtils;

const ModelService = JClass._extend({
  init(repositoryFactory, realmApi, modelManagerFactory) {
    this.repositoryFactory = repositoryFactory;
    this.realmApi = realmApi;
    this.modelManagerFactory = modelManagerFactory;
  },

  async getModel(options = {}) {
    let modelEnvironment = await this.realmApi.getModelEnvironment(options.modelId);
    let repository = this.repositoryFactory.createFromModelEnvironment(modelEnvironment);
    let Model = repository.get(modelEnvironment.modelClass);
    return Model;
  },

  async loadSystemModel(options = {}) {

    let modelEnvironment = await this.realmApi.getModelEnvironment(options.modelId);
    let modelManager = await this.modelManagerFactory.createModelManager({ dbName: modelEnvironment.region.database });
    let Model = modelManager.registerModel(options.systemModel,options.schema);

    return Model;
  }

});

ModelService.$inject = ['repositoryFactory','realmApi','modelManagerFactory'];

module.exports = ModelService;
