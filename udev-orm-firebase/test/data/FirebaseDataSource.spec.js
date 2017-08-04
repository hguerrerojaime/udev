
import firebase from 'firebase';

import { FirebaseDataSource } from '../../src/index';

describe('FirebaseDataSource', function() {
  describe('Connecting to db', function() {

    var config = {
      apiKey: "AIzaSyCseRd8hOC-UhdtSwX3bmVfRz8Q8BKtrzs",
      authDomain: "udev-373c6.firebaseapp.com",
      databaseURL: "https://udev-373c6.firebaseio.com",
      projectId: "udev-373c6",
      storageBucket: "udev-373c6.appspot.com",
      messagingSenderId: "96913776203"
    };

    firebase.initializeApp(config);
    let dataSource = new FirebaseDataSource({firebase:firebase});

    it ('should have an id',function(){
      return dataSource.connect().then((db) => {

        let key = db.ref().child('post').push().key

        return db.ref().update({["/post/"+key]: { name:"test" }});

      });
    });

  });
});
