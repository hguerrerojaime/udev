function configureRoute(app, mvcModule, route, method, controllerName, actionName) {
    app[method](route, function (req, res) {
        const controller = mvcModule.get(`${controllerName}Controller`);
        const action = controller[actionName];
        const requestProcessor = mvcModule.get('requestProcessor');
        requestProcessor.process(controller, action, req, res);
    });
}
function configureRouter(app, mvcModule, routes = {}) {
    console.log("Configuring router...");
    for (const key in routes) {
        const route = routes[key];
        for (const method in route) {
            const methodArgs = route[method];
            console.log(`Configuring ${method} ${key} to controller: ${methodArgs.controller}, action: ${methodArgs.action}`);
            configureRoute(app, mvcModule, key, method, methodArgs.controller, methodArgs.action);
        }
    }
}
function createMvcModule(dependencies) {
    return require('./mvc-module').create(dependencies);
}
function create(args = {}) {
    const options = Object.assign({}, {
        express: require('express'),
        configure: function (app) { }
    }, args);
    const mvcModule = createMvcModule(options.dependencies);
    const app = options.express();
    options.configure(app);
    configureRouter(app, mvcModule, options.routes);
    return {
        app: app,
        dependencies: options.dependencies,
        routes: options.routes,
        mvcModule: mvcModule
    };
}
module.exports = {
    create: create
};
//# sourceMappingURL=udev-mvc.js.map