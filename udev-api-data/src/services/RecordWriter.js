const JClass = require('jclass');
const Repository = require('../core/Repository');

const RecordWriter = JClass._extend({

  init(modelManagerFactory,realmApi) {
    this.modelManagerFactory = modelManagerFactory;
    this.realmApi = realmApi;
  },

  async createRepository() {

    let models = await this.realmApi.getModelEnvironment("abc");
    let modelManager = this.modelManagerFactory.createModelManager({
      models: models,
      dbName: "udev_dev"
    });
    return new Repository(modelManager);
  },

  async create(options) {
    let repository = await this.createRepository();
    let Model = repository.get(options.model);
    let modelInstance = new Model(options.data);
    modelInstance.save();
    return modelInstance;
  }
});

RecordWriter.$inject = ['modelManagerFactory','realmApi'];

module.exports = RecordWriter;