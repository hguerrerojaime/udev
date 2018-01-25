module.exports = {
  '/': { get: { controller: "index", action: "about" } },
  '/realm': {
    post: { controller: "realm", action: "register" }
  },
  '/realm/:realmId' : {
    get: { controller: "realm", action: "show" }
  },
  '/realm/:realmId/region': {
    post: { controller: "region", action: "create" },
    get: { controller: "region", action: "list" }
  },
  '/realm/:realmId/region/:regionId': {
    get: { controller: "region", action: "show" }
  },
  '/user/me': {
    get: { controller: "user", action: "me" }
  },
  '/user/me/realms': {
    get: { controller: "user", action: "myRealms" }
  },
  '/user': {
    post: { controller: "user", action: "register" }
  }

  // '/realm/:realmId/region/:regionId/model': {
  //   post: { controller: "model", action: "create" }
  // }
};
