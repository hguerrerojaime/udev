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
const ResourceNotFoundError_1 = require("../errors/ResourceNotFoundError");
const AccessLevel_1 = require("../core/AccessLevel");
let RegionService = class RegionService {
    constructor(regionDAOFactory, userRegionDAOFactory, realmService, userService) {
        this.regionDAOFactory = regionDAOFactory;
        this.userRegionDAOFactory = userRegionDAOFactory;
        this.realmService = realmService;
        this.userService = userService;
    }
    create(realmId, command) {
        return __awaiter(this, void 0, void 0, function* () {
            const regionDAO = this.regionDAOFactory(realmId);
            const ref = yield regionDAO.addRegion({
                currentAccount: command.currentAccount,
                name: command.name,
                description: command.description,
                access: command.access
            });
            return ref.id;
        });
    }
    findAllVisibleRegions(realmId, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.verifyRealmAccessByAccount(realmId, accountId);
            const regionDAO = this.regionDAOFactory(realmId);
            const visibleRegions = yield regionDAO.findAllVisibleRegions().get();
            return visibleRegions.docs;
        });
    }
    findAllUserRegionsByAccountId(realmId, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByAccountId(accountId);
            return this.findAllUserRegions(realmId, user.id);
        });
    }
    findAllRegionsByAccountId(realmId, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return [].concat(yield this.findAllVisibleRegions(realmId, accountId), yield this.findAllUserRegionsByAccountId(realmId, accountId));
        });
    }
    get(realmId, accountId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.verifyRealmAccessByAccount(realmId, accountId);
            const regionDAO = this.regionDAOFactory(realmId);
            const ref = regionDAO.find(id);
            const doc = yield ref.get();
            if (doc.exists) {
                return doc.data();
            }
        });
    }
    canReadRegion(realmId, regionId, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const regionDAO = this.regionDAOFactory(realmId);
            const user = yield this.userService.getUserByAccountId(accountId);
            return yield regionDAO.canDoWithRegion(regionId, user.id, AccessLevel_1.AccessLevel.READ);
        });
    }
    canWriteRegion(realmId, regionId, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const regionDAO = this.regionDAOFactory(realmId);
            const user = yield this.userService.getUserByAccountId(accountId);
            return yield regionDAO.canDoWithRegion(regionId, user.id, AccessLevel_1.AccessLevel.WRITE);
        });
    }
    canAdminRegion(realmId, regionId, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const regionDAO = this.regionDAOFactory(realmId);
            const user = yield this.userService.getUserByAccountId(accountId);
            return yield regionDAO.canDoWithRegion(regionId, user.id, AccessLevel_1.AccessLevel.ADMIN);
        });
    }
    canOwnRegion(realmId, regionId, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const regionDAO = this.regionDAOFactory(realmId);
            const user = yield this.userService.getUserByAccountId(accountId);
            return yield regionDAO.canDoWithRegion(regionId, user.id, AccessLevel_1.AccessLevel.OWNER);
        });
    }
    findAllUserRegions(realmId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.verifyRealmAccessByUser(realmId, userId);
            const userRegionDAO = this.userRegionDAOFactory(realmId);
            const regionDAO = this.regionDAOFactory(realmId);
            const userRegionRef = userRegionDAO.findUserRegions(userId);
            const userRegionIdList = yield userRegionRef.get();
            const regionIds = userRegionIdList.docs.map((doc) => doc.data().regionId);
            const userRegions = yield regionDAO.findMany(regionDAO.collection(), regionIds);
            return userRegions;
        });
    }
    verifyRealmAccessByAccount(realmId, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.realmService.isRealmVisibleToAccount(realmId, accountId))) {
                throw new ResourceNotFoundError_1.ResourceNotFoundError();
            }
        });
    }
    verifyRealmAccessByUser(realmId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.realmService.isRealmVisibleToUser(realmId, userId))) {
                throw new ResourceNotFoundError_1.ResourceNotFoundError();
            }
        });
    }
};
RegionService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("regionDAOFactory")),
    __param(1, inversify_1.inject("userRegionDAOFactory")),
    __param(2, inversify_1.inject("realmService")),
    __param(3, inversify_1.inject("userService")),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], RegionService);
exports.default = RegionService;
//# sourceMappingURL=RegionService.js.map