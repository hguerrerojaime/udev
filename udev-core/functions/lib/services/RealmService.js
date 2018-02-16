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
const AccessLevel_1 = require("../core/AccessLevel");
const ResourceNotFoundError_1 = require("../errors/ResourceNotFoundError");
let RealmService = class RealmService {
    constructor(db, realmDAO, userService, userRealmDAO, regionDAOFactory) {
        this.db = db;
        this.realmDAO = realmDAO;
        this.userService = userService;
        this.userRealmDAO = userRealmDAO;
        this.regionDAOFactory = regionDAOFactory;
    }
    register(command) {
        const $this = this;
        return this.db.runTransaction(function (transaction) {
            return __awaiter(this, void 0, void 0, function* () {
                const ref = yield $this.realmDAO.addRealm({
                    currentAccount: command.currentAccount,
                    name: command.name,
                    description: command.description,
                    private: command.private
                }, transaction);
                yield $this.assignUserToNewRealm(ref.id, command.currentAccount, transaction);
                const regionDAO = $this.regionDAOFactory(ref.id);
                yield regionDAO.addRegion({
                    currentAccount: command.currentAccount,
                    name: "development",
                    description: "Development Sandbox"
                }, transaction);
                return ref.id;
            });
        });
    }
    assignUserToNewRealm(realmId, currentAccount, transaction = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByAccountId(currentAccount);
            return yield this.userRealmDAO.addUserToRealm({
                currentAccount: currentAccount,
                userId: user.id,
                realmId: realmId,
                accessLevel: AccessLevel_1.AccessLevel.OWNER
            }, transaction);
        });
    }
    isRealmVisibleToUser(realmId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const realm = yield this.realmDAO.find(realmId).get();
            //console.log(realm.data());
            if (realm.exists && !realm.data().private) {
                return true;
            }
            const query = yield this.userRealmDAO.findByRealmAndUser(realmId, userId).get();
            return query.size > 0;
        });
    }
    isRealmVisibleToAccount(realmId, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByAccountId(accountId);
            return this.isRealmVisibleToUser(realmId, user.id);
        });
    }
    findAllPublicRealms() {
        return this.realmDAO.findAllPublicRealms().get();
    }
    findAllUserRealms(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRealmRef = this.userRealmDAO.findAllUserRealms(id);
            const userRealmIdList = yield userRealmRef.get();
            const realmIds = userRealmIdList.docs.map((doc) => doc.data().realmId);
            return this.realmDAO.findMany(this.realmDAO.collection(), realmIds);
        });
    }
    findAllUserRealmsByAccountId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByAccountId(id);
            return this.findAllUserRealms(user.id);
        });
    }
    findAllRealmsByAccountId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRealmCollection = yield this.findAllUserRealmsByAccountId(id);
            const publicRealmCollection = yield this.findAllPublicRealms();
            const result = {
                user: {},
                public: {}
            };
            userRealmCollection.forEach(function (doc) {
                result.user[doc.id] = doc.data();
            });
            publicRealmCollection.forEach(function (doc) {
                result.public[doc.id] = doc.data();
            });
            return result;
        });
    }
    get(id, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const isVisible = yield this.isRealmVisibleToAccount(id, accountId);
            const doc = yield this.realmDAO.find(id);
            if (isVisible) {
                return doc.data();
            }
            else {
                throw new ResourceNotFoundError_1.ResourceNotFoundError();
            }
        });
    }
};
RealmService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("db")),
    __param(1, inversify_1.inject("realmDAO")),
    __param(2, inversify_1.inject("userService")),
    __param(3, inversify_1.inject("userRealmDAO")),
    __param(4, inversify_1.inject("regionDAOFactory")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], RealmService);
exports.default = RealmService;
//# sourceMappingURL=RealmService.js.map