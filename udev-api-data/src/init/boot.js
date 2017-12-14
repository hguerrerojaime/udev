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
  let DataSourceFactory = require('../core/DataSourceFactory');

  let dataSourceFactory = new DataSourceFactory();

  dataSourceFactory.createDataSource().then((dataSource) => {
    let dependencies = require('./dependencies');
    dependencies.values.dataSource = dataSource;
    bootMvc(require('udev-mvc'), dependencies, require('../config/routes'));
  });
}

boot();
