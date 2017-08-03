
import admin from 'firebase-admin';

import { FirebaseDataSource } from '../../src/index';

describe('FirebaseDataSource', function() {
  describe('Connecting to db', function() {

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://udev-373c6.firebaseio.com"
    });

    let dataSource = new FirebaseDataSource({firebase:admin});

    it ('should have an id',function(){
      dataSource.connect().then((db) => {
        db.ref('/meta').once('value',(snapshot) => {
          console.log(snapshot);
        });
      });
    });

  });
});
