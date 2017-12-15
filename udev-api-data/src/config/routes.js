module.exports = {
  '/': { get: { controller: "index", action: "index" } },
  '/rec': {
    post: { controller: "recordWrite", action: "create" }
  },
  '/rec/:id': {
    put: { controller: "recordWrite", action: "update" },
    delete: { controller: "recordWrite", action: "delete" },
    get: { controller: "recordView", action: "show" }
  }
};
