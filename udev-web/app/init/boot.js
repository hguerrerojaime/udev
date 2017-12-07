const express = require('express');
const app = express();
const ejs = require('ejs');
const superagent = require('superagent');
const uglify = require('uglify-es');




app.use('/static', express.static(__dirname + '/../../static'));
app.use('/udev-vue.js', express.static(__dirname + '/../../node_modules/udev-vue/dist/udev-vue.js'));
app.use('/af7ae505a9eed503f8b8e6982036873e.woff2',
  express.static(__dirname + '/../../node_modules/udev-vue/dist/af7ae505a9eed503f8b8e6982036873e.woff2')
);

app.get('/', function (req, res) {
  res.redirect('/hr');
});

app.get('/:app', function (req, res) {

  let action = req.query.a || "index";
  let domainObject = req.query.do;

  Promise.all([
    superagent.get(`http://localhost:3001/application`),
    superagent.get(`http://localhost:3001/application/${req.params.app}`)
  ]).then((responses) => {
    let applications = responses[0].body;
    let currentApplication = responses[1].body;

    let data = {
      applications: applications.map((app) => { return { id:app.id, name: app.name } }),
      application: currentApplication,
      domainObject: domainObject,
      action: action
    };

    ejs.renderFile('app/templates/html/index.ejs.html', data, function(err,html) {
      res.send(html);
    });
  });


});

app.get('/scripts/application/index.js', function (req, res) {

  res.set('Content-Type', 'application/javascript');

  ejs.renderFile(`app/templates/js/index.ejs.js`, {}, function(err,js) {
    res.send(uglify.minify(js).code);
  });


});

app.get('/scripts/application/:action.js', function (req, res) {

  res.set('Content-Type', 'application/javascript');

  superagent.get(`http://localhost:3001/layout/${req.query.do}`).then((response) => {

    let layout = response.body;

    let data = {
      formData: buildFormData(layout),
      fieldOptions: buildFieldOptions(layout),
      layout: layout
    };

    ejs.renderFile(`app/templates/js/${req.params.action}.ejs.js`, data, function(err,js) {
      console.log(err);
      res.send(uglify.minify(js).code);
    });

  });


});


function getAllLayoutComponents(layout) {
  return [].concat.apply([],layout.sections.map((section) => {
    return [].concat.apply([],section.columns.map((column) => {
      return [].concat.apply([],column.components);
    }));
  }));
}

function buildFieldOptions(layout) {

  let allComponents = getAllLayoutComponents(layout);

  let result = {};

  allComponents.forEach((component) => {
    let fieldOpts = component.fieldOptions;

    if (!fieldOpts) {
      fieldOpts = {};
    }

    result[component.field] = fieldOpts;
  });

  return result;
}

function buildFormData(layout) {

  let allComponents = getAllLayoutComponents(layout);

  let result = {};

  allComponents.forEach((component) => {
    result[component.field] = null;
  });

  return result;
}



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
