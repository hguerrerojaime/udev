"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const udev_mvc_ts_1 = require("udev-mvc-ts");
class IndexController extends udev_mvc_ts_1.RestController {
    about() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                name: "Application Builder",
                version: "alpha-0.0.1"
            };
        });
    }
}
exports.default = IndexController;
//# sourceMappingURL=IndexController.js.map