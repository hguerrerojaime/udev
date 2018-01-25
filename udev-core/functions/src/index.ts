const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//import "./ext/index";

import { Mvc } from 'udev-mvc-ts';
import { FirebaseTokenFilter } from './core/FirebaseTokenFilter';


const cors = require('cors');
const filter = new FirebaseTokenFilter(admin);

const mvc = new Mvc({
  dependencies: require('./config/dependencies'),
  routes: require('./config/routes'),
  configure: function(app) {
    app.use(require('body-parser').json());
    app.use(cors());
    app.use((req,res,next) => {
      filter.doFilter(req,res,next);
    });
  }
})

export const api = functions.https.onRequest(mvc.application);

// Start writing Firebase Functions
// https://firebase.google.com/functions/write-firebase-functions

// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
