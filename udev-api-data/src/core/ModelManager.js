const JClass = require('jclass');

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

    let schema = new Schema(
      meta.attributes,Object.assign({},meta.options,{
      })
    );

    schema.method('toJSON', function() {
      var obj = this.toObject();
      //Rename fields
      obj.id = obj._id;
      delete obj._id;

      return obj;
    });

    console.log(schema.method);
    // schema.set('toJSON', {
    //   virtuals: true,
    //   versionKey:false,
    //   transform: function (doc, ret) {   delete ret._id  }
    // });

    this.models[modelName] = this.dataSource.connection.model(modelName,schema);
  },

  getModel(modelName) {
    return this.models[modelName];
  }

});


module.exports = ModelManager;
