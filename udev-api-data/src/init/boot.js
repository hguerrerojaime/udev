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

function boot() {

  let dependencies = require('./dependencies');
  bootMvc(require('udev-mvc'), dependencies, require('../config/routes'));

}

boot();
