function startServer(app) {
  console.log("Starting server...");
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
}

function bootMvc(udevMvc,dependencies,routes) {

  let express = require('express');

  let udev = udevMvc.create({
    moduleName: 'appModule',
    express: express,
    dependencies: dependencies,
    routes: routes,
    DI: require('node-di'),
    configure: function(app) {
      app.use(require('body-parser').json());
    }
  });

  startServer(udev.app);
}

function configMongoose(mongoose = require('mongoose')) {

  mongoose.Promise = Promise;

  console.log(mongoose.Schema.method);

  // mongoose.Schema.set('toJSON', {
  //     virtuals: true
  // });
}

function boot() {

  configMongoose();

  bootMvc(require('udev-mvc'), require('./dependencies'), require('../config/routes'));
}

boot();
