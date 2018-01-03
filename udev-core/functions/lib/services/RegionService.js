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
const inversify_1 = require("inversify");
let RegionService = class RegionService {
    constructor(realmService, pathResolver) {
        this.realmService = realmService;
        this.pathResolver = pathResolver;
    }
    create(command) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.realmService.exists(command.realmId)) {
                const regionCollectionRef = this.pathResolver.lookup(`realm["${command.realmId}"].region`);
                const ref = yield regionCollectionRef.add({
                    name: command.name,
                    description: command.description,
                    release: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    createdBy: command.userId,
                    updatedBy: command.userId
                });
                return ref.id;
            }
        });
    }
    list(realmId) {
        return __awaiter(this, void 0, void 0, function* () {
            const regionList = yield this.pathResolver.lookup(`realm["${realmId}"].region`).get();
            const result = [];
            regionList.forEach((doc) => {
                result.push(Object.assign({}, doc.data(), { id: doc.id }));
            });
            return result;
        });
    }
    exists(realmId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = this.pathResolver.lookup(`realm["${realmId}"].region["${id}"]`);
            const doc = yield ref.get();
            return doc.exists;
        });
    }
    get(realmId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = this.pathResolver.lookup(`realm["${realmId}"].region["${id}"]`);
            const doc = yield ref.get();
            if (doc.exists) {
                return Object.assign({}, doc.data(), { id: id });
            }
        });
    }
};
RegionService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("realmService")),
    __param(1, inversify_1.inject("pathResolver")),
    __metadata("design:paramtypes", [Object, Object])
], RegionService);
exports.default = RegionService;
//# sourceMappingURL=RegionService.js.map