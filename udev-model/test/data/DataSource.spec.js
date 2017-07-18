import assert from 'assert';

import { MongoClient } from 'mongodb';
import { DataSource } from '../../src/index';

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
             db.close();
          });
        });
      }

    }

    let dataSource = new MongoDataSource({url:"mongodb://localhost:27017/test"})

    it ('should be able to connect to the database',function(){
       dataSource.connect().catch((err) => {
          assert.fail('could not connect to the db');
       });
    });

  });

});
