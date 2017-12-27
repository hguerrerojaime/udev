"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("./Controller");
class RestController extends Controller_1.default {
    get contentType() {
        return "application/json";
    }
    sendResponse(response, responseBody) {
        response.json(this.processResponseBody(responseBody));
    }
}
exports.default = RestController;
//# sourceMappingURL=RestController.js.map