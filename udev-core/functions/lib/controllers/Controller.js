"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
let Controller = class Controller {
    get contentType() {
        return "text/plain";
    }
    processResponseBody(responseBody) {
        return responseBody;
    }
    setResponseContentType(response) {
        response.set('Content-Type', this.contentType);
    }
    respond(actionPromise, request, response) {
        actionPromise.then((responseBody) => this.sendResponse(response, responseBody));
    }
    sendResponse(response, responseBody) {
        response.send(this.processResponseBody(responseBody));
    }
};
Controller = __decorate([
    inversify_1.injectable()
], Controller);
exports.default = Controller;
//# sourceMappingURL=Controller.js.map