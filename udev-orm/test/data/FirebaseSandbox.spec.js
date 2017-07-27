import assert from 'assert';

import { Entity, DataSource, EntityManager, PersistenceContext } from '../../index';

import firebase from 'firebase';

describe('Firebase Sandbox', function() {
  describe('Messing around with mongodb', function() {

    var config = {
      apiKey: "AIzaSyCseRd8hOC-UhdtSwX3bmVfRz8Q8BKtrzs",
      authDomain: "udev-373c6.firebaseapp.com",
      databaseURL: "https://udev-373c6.firebaseio.com",
      projectId: "udev-373c6",
      storageBucket: "udev-373c6.appspot.com",
      messagingSenderId: "96913776203"
    };


    firebase.initializeApp(config);

    @Entity()
    class Post {

       static attrs = {
          title : 'string',
          author : 'string'
       };

    }


    class FirebaseDataSource extends DataSource {
      constructor(props = {}) {
        super(props);
      }

      connect() {
        return new Promise((fullfill,reject) => {
          fullfill(firebase.database());
        });
      }
    }

    class FirebaseEntityManager extends EntityManager {
      constructor(dataSource,persistenceContext) {
        super(dataSource,persistenceContext);
      }

      get(clazz,id) {
        return new Promise((fullfill,reject) => {
          this.dataSource.connect().then((db) => {
            let cn = this.persistenceContext.getCollectionName(clazz);

            db.ref(`/${cn}/${id}`).once('value').then((snapshot) => {
              fullfill(new clazz(Object.assign({},snapshot.val(),{ id:id })));
            });

          });
        });
      }

      all(clazz) {
        return new Promise((fullfill,reject) => {
          this.dataSource.connect().then((db) => {
            let cn = this.persistenceContext.getCollectionName(clazz);
            console.log(db.ref(`/${cn}`));
            db.ref(`/${cn}`).once('value').then((snapshot) => {

              console.log("fetched");

              let result = [];
              let iterate = (snapshot) => {
                result.push(new clazz(Object.assign({},snapshot.val(),{ id:snapshot.key })));
              };
              snapshot.forEach(iterate);
              fullfill(result);
            });

          });
        });
      }
co
      save(instance) {
        return new Promise((fullfill,reject) => {
            this.dataSource.connect().then((db) => {
              let clazz = instance.constructor;
              let cn = this.persistenceContext.getCollectionName(clazz);
              let id = db.ref().child(cn).push().key;
              let path = `/${cn}/${id}`;
              db.ref().update({ [path]:instance.json() });

              fullfill(this.get(clazz,id));
            });
        });
      }
    }

    let context = new PersistenceContext();
    context.registerEntity(Post);

    let dataSource = new FirebaseDataSource();

    let em = new FirebaseEntityManager(dataSource,context);

    it('play',function(){

      let post = new Post({title:"firebase",author:"beto"});

      post.save().then((saved) => {
        console.log("post saved");
        console.log(saved.id);
        Post.all().then(posts => console.log(posts));
      });





    });

  });
});
