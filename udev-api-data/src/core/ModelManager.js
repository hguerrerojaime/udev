const JClass = require('jclass');
const timestamps = require('mongoose-timestamp');

const ModelManager = JClass._extend({
  init(dataSource) {
    this._dataSource = dataSource;
    this._models = {};
  },

  get dataSource() {
    return this._dataSource;
  },

  get models() {
    return this._models;
  },

  registerModel(modelName,meta) {

    let Schema = this.dataSource.mongoose.Schema;

    let metaAttributes = Object.assign({},meta.attributes,{});
    let metaOptions = Object.assign({},meta.options,{});
    let schema = new Schema(metaAttributes,metaOptions);
    schema.plugin(timestamps);
    schema.method('toJSON', function() {
      var obj = this.toObject();
      //Rename fields
      obj.id = obj._id;
      delete obj._id;

      return obj;
    });

    let Model = this.dataSource.connection.model(modelName,schema);
    this.models[modelName] = Model;
    return Model;
  },

  getModel(modelName) {
    return this.models[modelName];
  }

});


module.exports = ModelManager;
