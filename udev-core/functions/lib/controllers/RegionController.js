"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const inversify_1 = require("inversify");
let RegionController = class RegionController extends udev_mvc_ts_1.RestController {
    constructor(regionService) {
        super();
        this.regionService = regionService;
    }
    create($request, realmId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.regionService.create(Object.assign({}, $request.body, { realmId: realmId }));
        });
    }
    list($request, realmId) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAccount = $request.user.uid;
            const regionCollection = yield this.regionService.findAllRegionsByAccountId(realmId, currentAccount);
            const result = {};
            regionCollection.forEach(function (doc) {
                result[doc.id] = doc.data();
            });
            return result;
        });
    }
    show($request, realmId, regionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAccount = $request.user.uid;
            return yield this.regionService.get(realmId, currentAccount, regionId);
        });
    }
};
RegionController = __decorate([
    __param(0, inversify_1.inject("regionService")),
    __metadata("design:paramtypes", [Object])
], RegionController);
exports.default = RegionController;
//# sourceMappingURL=RegionController.js.map