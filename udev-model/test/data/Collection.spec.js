import assert from 'assert';

import { MongoClient } from 'mongodb';
import { DataSource,Collection } from '../../src/index';

describe('Collection', function() {
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

    class MongoCollection extends Collection {

      constructor(name) {
        super(name);
      }

      compile(db) {
        return db.collection(this.name);
      }

    }

    let dataSource = new MongoDataSource({url:"mongodb://localhost:27017/test"})
    let collection = new MongoCollection("users");

    it ('should be able to retrieve collection',function(){
       dataSource.connect().then((db) => {
         let col = collection.compile(db);
         console.log(col.find({}).toArray());
       });
    });

  });

});
