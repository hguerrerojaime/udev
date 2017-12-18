const JClass = require('jclass');
const Repository = require('../core/Repository');
const modelUtils = require('../util/index').modelUtils;

const RecordViewService = JClass._extend({
  init(modelManagerFactory, realmApi) {
    this.modelManagerFactory = modelManagerFactory;
    this.realmApi = realmApi;
  },

  async loadModel() {

    let repository = this.repositoryFactory.createModelManager

  }

});

RecordViewService.$inject = ['modelManagerFactory','realmApi'];

module.exports = RecordViewService;
