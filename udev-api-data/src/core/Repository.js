const JClass = require('jclass');

const Repository = JClass._extend({
  init(modelManager) {
    this._modelManager = modelManager;
  },

  get modelManager() {
    return this._modelManager;
  },

  get(modelName) {
    return this.modelManager.getModel(modelName);
  }

});

module.exports = Repository;
