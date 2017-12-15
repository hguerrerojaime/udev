const JClass = require('jclass');
const ModelManager = require('./ModelManager');

const ModelManagerFactory = JClass._extend({

  init(dataSourceFactory,mongoose) {
    this.dataSourceFactory = dataSourceFactory;
    this.mongoose = mongoose;
  },

  createModelManager(options) {

    let opts = Object.assign({},{
      models: {}
    },options);

    let dataSource = this.dataSourceFactory.createDataSource({
      mongoose: this.mongoose,
      url: `mongodb://localhost/${opts.dbName}`
    });

    let modelManager = new ModelManager(dataSource);

    for (let className in opts.models) {
      let schema = opts.models[className]
      modelManager.registerModel(className,schema);
    }

    return modelManager;
  }

});

ModelManagerFactory.$inject = ['dataSourceFactory','mongoose'];

module.exports = ModelManagerFactory;
