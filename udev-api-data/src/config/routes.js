module.exports = {
  '/': { get: { controller: "index", action: "index" } },
  '/rec/:modelId': {
    post: { controller: "recordWrite", action: "create" },
    get: { controller: "recordRead", action: "list" }
  },
  '/rec/:modelId/:id': {
    put: { controller: "recordWrite", action: "update" },
    delete: { controller: "recordWrite", action: "delete" },
    get: { controller: "recordRead", action: "show" }
  },
  '/v/:modelId': {
    post: { controller: "view", action: "create" },
    get: { controller: "view", action: "list" }
  },

  '/v/:modelId/:id': {
    put: { controller: "view", action: "update" },
    delete: { controller: "view", action: "delete" },
    get: { controller: "view", action: "show" }
  }
};
