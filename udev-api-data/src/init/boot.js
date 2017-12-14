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
    DI: require('node-di')
  });

  startServer(udev.app);
}

function boot(datasourceFactory = require('./datasource-factory')) {

  datasourceFactory.createDatasource()
    .then((datasource) => {

      let dependencies = require('./dependencies');
      dependencies.values.datasource = datasource;
      bootMvc(require('udev-mvc'), dependencies, require('../config/routes'));
    })
    .catch((err) => {
      console.error(err);
      return process.exit(1);
    })
  ;

}

boot();
