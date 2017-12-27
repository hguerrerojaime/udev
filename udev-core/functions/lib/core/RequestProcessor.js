"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const parameterfy = require('../core/util').parameterfy;
const inversify_1 = require("inversify");
let RequestProcessor = class RequestProcessor {
    process(controller, action, req, res) {
        const actionProxy = parameterfy(action, controller);
        const actionPromise = actionProxy(Object.assign({}, {
            $request: req,
            $response: res
        }, req.params));
        if (!res.headersSent) {
            controller.setResponseContentType(res);
            controller.respond(actionPromise, req, res);
        }
    }
};
RequestProcessor = __decorate([
    inversify_1.injectable()
], RequestProcessor);
exports.default = RequestProcessor;
//# sourceMappingURL=RequestProcessor.js.map