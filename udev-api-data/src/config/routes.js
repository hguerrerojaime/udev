module.exports = {
  '/': { get: { controller: "index", action: "index" } },
  '/rec': {
    post: { controller: "recordWrite", action: "create" },
    put: { controller: "recordWrite", action: "update" },
    delete: { controller: "recordWrite", action: "delete" }
  }
};
