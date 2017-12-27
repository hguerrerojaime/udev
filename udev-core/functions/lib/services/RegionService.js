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
    constructor(realmService) {
        this.realmService = realmService;
    }
    create(realmId, command) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.realmService.exists(realmId)) {
                const realmRef = yield this.realmService.ref(realmId);
                const ref = realmRef.collection('region').add({
                    name: command.name,
                    description: command.description,
                    release: false,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                return yield this.get(realmId, ref.id);
            }
        });
    }
    ref(realmId, id) {
        return this.collectionRef(realmId).doc(id);
    }
    collectionRef(realmId) {
        return this.realmService.ref(realmId).collection('region');
    }
    list(realmId) {
        return __awaiter(this, void 0, void 0, function* () {
            const regionList = yield this.collectionRef(realmId).get();
            const result = [];
            regionList.forEach((doc) => {
                result.push(Object.assign({}, doc.data(), { id: doc.id }));
            });
            return result;
        });
    }
    get(realmId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = this.ref(realmId, id);
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
    __metadata("design:paramtypes", [Object])
], RegionService);
exports.default = RegionService;
//# sourceMappingURL=RegionService.js.map