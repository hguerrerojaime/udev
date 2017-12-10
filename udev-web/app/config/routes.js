module.exports = {
  '/': { get: { controller: "applicationView", action: "index" } },
  '/:app': { get: { controller: "applicationView", action: "appIndex" } },
  '/scripts/application/index.js': { get: { controller: "applicationJs", action: "index" } },
  '/scripts/application/list.js': { get: { controller: "applicationJs", action: "recordList" } },
  '/scripts/application/edit.js': { get: { controller: "applicationJs", action: "recordEdit" } }
};
