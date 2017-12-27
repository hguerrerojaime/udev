module.exports = {
    '/': { get: { controller: "index", action: "about" } },
    '/realm': {
        post: { controller: "realm", action: "register" }
    },
    '/realm/:realmId': {
        get: { controller: "realm", action: "show" }
    },
    '/realm/:realmId/region': {
        post: { controller: "region", action: "create" },
        get: { controller: "region", action: "list" }
    },
    '/realm/:realmId/region/:regionId': {
        get: { controller: "region", action: "show" }
    }
};
//# sourceMappingURL=routes.js.map