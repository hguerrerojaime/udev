const JClass = require('jclass');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const superagent = require('superagent');

const RealmApi = JClass._extend({


  async getModelEnvironment(id) {
    let response = await superagent.get(`http://demo7864197.mockable.io/model/${id}/env`);
    let environment = response.body;
    let modelEnvironment = {
      region: environment.region,
      modelClass: environment.model.clazz,
      models: {
        [environment.model.clazz]: this.buildModelSchema(environment.model.attributes)
      }
    }
    for (let ref in environment.refs) {
      let model = environment.refs[ref];
      modelEnvironment.models[ref] = this.buildModelSchema(model);
    }
    return modelEnvironment;
  },
  buildModelSchema(attributes) {
    let attrs = attributes;
    let schema = {
      attributes: {}
    };
    for (let name in attrs) {
      let isArray = attrs[name] instanceof Array;
      let attr = isArray ? attrs[name][0] : attrs[name];
      let attrNewValue = Object.assign({},attr,{ type: Schema.Types[attr.type] });
      schema.attributes[name] = isArray ? [attrNewValue] : attrNewValue;
    }
    return schema;
  }
});

module.exports = RealmApi;
