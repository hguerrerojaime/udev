module.exports = {
  '/': { method: "get", controller: "applicationView", action: "index" },
  '/:app': { method: "get", controller: "applicationView", action: "appIndex" },
  '/scripts/application/index.js': { method: "get", controller: "applicationJs", action: "index" },
  '/scripts/application/list.js': { method: "get", controller: "applicationJs", action: "recordList" },
  '/scripts/application/edit.js': { method: "get", controller: "applicationJs", action: "recordEdit" }
};
