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
 defaultModelSettings: {
   primaryKey: 'id',
   datastore: 'default',
   attributes: {
     id: { type: 'string', columnName: '_id' }
   }
 }
};

const DataSourceFactory = JClass._extend({

  createDataSource(options = {}) {

    let opts = Object.assign({},{
      callback: (dataSource) => {}
    },options);

    let wlOptions = Object.assign({},WL_OPTS,{
      models: {
        post: {
          attributes: {
            title: { type: 'string', required: true }
          }
        }
      }
    });

    return new Promise(function(fullfill,reject) {
      WaterLine.start(wlOptions,function(err,orm) {
        if (err) {
          reject(err);
        } else {
          fullfill({
            waterline: orm,
            model: function(modelName) {
              return orm.collections[modelName];
            }
          });
        }
      });
    });
  }

});

module.exports = DataSourceFactory;
