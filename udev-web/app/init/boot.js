function configureStaticResources(app,express) {
  console.log("Configuring static resoures...");
  app.use('/static', express.static(__dirname + '/../../static'));
  app.use('/udev-vue.js', express.static(__dirname + '/../../node_modules/udev-vue/dist/udev-vue.js'));
  app.use('/af7ae505a9eed503f8b8e6982036873e.woff2',
    express.static(__dirname + '/../../node_modules/udev-vue/dist/af7ae505a9eed503f8b8e6982036873e.woff2')
  );
}

function configureRouter(app,appModule,routes = require('../config/routes')) {
  console.log("Configuring router...");
  for (let key in routes) {
    let route = routes[key];
    console.log(`Configuring route ${key} to controller: ${route.controller}, action: ${route.action}`);
    app[route.method](key,function(req,res) {
      let controller = appModule.factory(`${route.controller}Controller`);
      let action = controller[route.action];
      let requestProcessor = appModule.service('requestProcessor');
      requestProcessor.process(controller,action,req,res);
    });
  }
}

function startServer(app) {
  console.log("Starting server...");
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
}

function boot(express,appModule) {
  console.log("Booting application...");
  let app = express();

  configureStaticResources(app,express);
  configureRouter(app,appModule);
  startServer(app);
}

const express = require('express');
const appModule = require('./app-module').create();

boot(express,appModule);
