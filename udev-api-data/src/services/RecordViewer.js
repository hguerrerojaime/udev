const JClass = require('jclass');
const Repository = require('../core/Repository');

const RecordViewer = JClass._extend({

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

  async get(options) {
    let repository = await this.createRepository();
    let Model = repository.get(options.model);
    return await new Promise((fullfill,reject) => {
      Model.findById(options.id, function(err, instance) {
        if (err) reject(err);
        fullfill(instance);
      });
    });
  }
});

RecordViewer.$inject = ['modelManagerFactory','realmApi'];

module.exports = RecordViewer;
