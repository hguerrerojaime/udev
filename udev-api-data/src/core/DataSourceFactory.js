const WaterLine = require('waterline');
const MongoAdapter = require('sails-mongo');
const JClass = require('jclass');

const WL_OPTS = {
 adapters: {
   'sails-mongo': MongoAdapter
 },
 datastores: {
   default: {
     adapter: 'sails-mongo',
     host: 'localhost',
     port: 27017,
     user: 'admin',
     database: 'udev_data'
   }
 },
 defaults: {
  primaryKey: 'id',
  datastore: 'default',
  attributes: {
    id: { type: 'string', columnName: '_id' },
  },
  models: {}
 }
};

const DataSourceFactory = JClass._extend({

  createDataSource(options = {}) {

    let opts = Object.assign({},{
      callback: (dataSource) => {}
    },options);

    let wlOptions = Object.assign({},WL_OPTS,{

    });

    let waterLine = new WaterLine();

    console.log(Waterline.Model.extend({
      datastore: 'default',
      identity: 'post',
      attributes: {
        title: { type: 'string', required: true }
      }
    }));

    waterLine.initialize(wlOptions,function(err,orm) {
      if (err) {
        console.error(err);
      } else {

        console.log(orm);

        let dataSource = {
          waterline: orm,
          model: function(modelName) {
            return WaterLine.getModel(modelName,orm);
          }
        };

        opts.callback(dataSource);
        waterLine.teardown();

      }
    });

  }

});

module.exports = DataSourceFactory;
