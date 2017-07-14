import assert from 'assert';

import mongodb from 'mongo-mock';
import { MongoClient } from 'mongo-mock';

import { DataSource } from '../../src/index';

mongodb.max_delay = 0;
MongoClient.persist="mongo.js";

describe('DataSource', function() {
  describe('creating a mongodb implementation', function() {

    class MongoDataSource extends DataSource {

      constructor(params) {
        super(params);
      }

      connect() {

        return new Promise((fullfill,reject) => {
          MongoClient.connect(this.params.url, (err,db) => {

             if (err) {
               reject(err);
             }

             fullfill(db);
          });
        });
      }

    }

    let dataSource = new MongoDataSource({url:"mongodb://localhost:27017/test"})

    it ('should be able to connect to the database',function(){
       dataSource.connect().then((db) => {
          console.log("connected");
       });
    });

  });

});
