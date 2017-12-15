const JClass = require('jclass');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RealmApi = JClass._extend({

  async getModelEnvironment(id) {
    return {
      Post__c: {
        attributes: {
          title: String,
          author: { type: Schema.Types.ObjectId, ref: 'Author__c' }
        },
        options: {}
      },
      Author__c: {
        attributes: {
          name: String,
          posts: [{ type: Schema.Types.ObjectId, ref: 'Post__c' }]
        },
        options: {}
      }
    };
  }
});

module.exports = RealmApi;
