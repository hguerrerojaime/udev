const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

import "reflect-metadata";

const cors = require('cors');
const UDevMvc = require('./core/udev-mvc');
const udevMvc = UDevMvc.create({
  dependencies: require('./config/dependencies'),
  routes: require('./config/routes'),
  configure: function(app) {
    app.use(require('body-parser').json());
    app.use(cors());
  }
});

export const api = functions.https.onRequest(udevMvc.app);

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
