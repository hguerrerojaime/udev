"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
//import "./ext/index";
const udev_mvc_ts_1 = require("udev-mvc-ts");
const FirebaseTokenFilter_1 = require("./core/FirebaseTokenFilter");
const cors = require('cors');
const filter = new FirebaseTokenFilter_1.FirebaseTokenFilter(admin);
const mvc = new udev_mvc_ts_1.Mvc({
    dependencies: require('./config/dependencies'),
    routes: require('./config/routes'),
    configure: function (app) {
        app.use(require('body-parser').json());
        app.use(cors());
        app.use((req, res, next) => {
            filter.doFilter(req, res, next);
        });
    }
});
exports.api = functions.https.onRequest(mvc.application);
// Start writing Firebase Functions
// https://firebase.google.com/functions/write-firebase-functions
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
//# sourceMappingURL=index.js.map