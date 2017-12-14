const WaterLine = require('waterline');
const MongoAdapter = require('sails-mongo');

function generateMetadata(domainObjects = {}) {

  return {
    post: {
      attributes: {
        title: { type: 'string', required: true }
      }
    }
  }


}

function createDatasource(options) {

  console.log("Creating datasource");

  let wlOptions = {
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
      id: { type: 'string' },
    }
  },
   models: generateMetadata()

 };

  return new Promise(function(fullfill,reject) {

    let waterline = new WaterLine();

    waterline.initialize(wlOptions,function(err,orm) {
      if (err) {
        reject(err);
      } else {
        fullfill({
          waterline: waterline,
          orm: orm,
          model: function(modelName) {
            return waterline.getModel(modelName,orm);
          }
        });
      }
    });

  });
}

module.exports = {
  createDatasource: createDatasource
};
