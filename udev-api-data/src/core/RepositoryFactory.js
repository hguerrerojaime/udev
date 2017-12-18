const JClass = require('jclass');

const Repository = require('./Repository');

const RepositoryFactory = JClass._extend({

  init(modelManagerFactory) {
    this.modelManagerFactory = modelManagerFactory;
  },

  createFromModelManager(modelManager) {
    return new Repository(modelManager);
  },

  createFromModelEnvironment(modelEnvironment) {
    let modelManager = this.modelManagerFactory.createModelManager({
      models: modelEnvironment.models,
      dbName: modelEnvironment.region.database
    });
    return this.createFromModelManager(modelManager);
  }

});

RepositoryFactory.$inject = ['modelManagerFactory']

module.exports = RepositoryFactory;
