import assert from 'assert';

import { Entity, DataSource, EntityManager, PersistenceContext } from '../../index';

import { MongoClient, ObjectID } from 'mongodb';

describe('Sandbox', function() {
  describe('Messing around with mongodb', function() {

    @Entity()
    class Post {

       static attrs = {
          title : 'string',
          author : 'string'
       };

    }


    class MongoDataSource extends DataSource {
      constructor(props = {}) {
        super(props);
      }

      connect() {
        return new Promise((fullfill,reject) => {
          MongoClient.connect(this.props.url,function(err,db) {
            if (err) {
              reject(err);
            } else {
              fullfill(db);
            }
          });
        });
      }
    }

    class MongoEntityManager extends EntityManager {
      constructor(dataSource,persistenceContext) {
        super(dataSource,persistenceContext);
      }

      get(clazz,id) {
        return new Promise((fullfill,reject) => {
          this.dataSource.connect().then((db) => {
            let cn = this.persistenceContext.getCollectionName(clazz);
            let collection = db.collection(cn);

            collection.findOne(ObjectID.createFromHexString(id),(err,document) => {
              if (err) {
                reject(err);
              } else {
                document.id = document._id;
                delete document._id;
                fullfill(new clazz(document));
              }
            });
          });
        });
      }

      all(clazz) {

        return new Promise((fullfill,reject) => {
          this.dataSource.connect().then((db) =>  {
            let cn = this.persistenceContext.getCollectionName(clazz);
            let collection = db.collection(cn);
            let result = [];

            let iterate = (err,item) => {

              if (item) {
                result.push(new clazz(item));
              } else {
                fullfill(result);
              }

            };
            collection.find().each(iterate);
          });
        });

      }
co
      save(instance) {
        return new Promise((fullfill,reject) => {
            this.dataSource.connect().then((db) => {
              let clazz = instance.constructor;
              let cn = this.persistenceContext.getCollectionName(clazz);
              let collection = db.collection(cn);
              let id = collection.insertOne(instance.model.attrs);

              this.get(clazz,id.toHexString()).then((saved) => {
                fullfill(saved);
              });

            });
        });
      }
    }

    let context = new PersistenceContext();
    context.registerEntity(Post);

    let dataSource = new MongoDataSource({url:"mongodb://localhost:27017/test"});

    let em = new MongoEntityManager(dataSource,context);

    it('play',function(){
      let query = Post.all();
    });

  });
});
