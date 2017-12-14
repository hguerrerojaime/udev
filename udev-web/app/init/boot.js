function configureStaticResources(app,express) {
  console.log("Configuring static resoures...");
  app.use('/static', express.static(__dirname + '/../../static'));
  app.use('/static/udev-vue.js', express.static(__dirname + '/../../node_modules/udev-vue/dist/udev-vue.js'));
  app.use('/af7ae505a9eed503f8b8e6982036873e.woff2',
    express.static(__dirname + '/../../node_modules/udev-vue/dist/af7ae505a9eed503f8b8e6982036873e.woff2')
  );
}

function startServer(app) {
  console.log("Starting server...");
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
}

function boot(udevMvc) {

  let express = require('express');

  let udev = udevMvc.boot({
    express: express,
    dependencies: require('./dependencies'),
    routes: require('../config/routes')
  });

  configureStaticResources(udev.app,express);
  startServer(udev.app);
}


boot(require('udev-mvc'));
