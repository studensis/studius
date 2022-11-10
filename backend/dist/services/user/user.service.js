"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("@prisma/client");
class UserService {
}
exports.UserService = UserService;
_a = UserService;
UserService.prisma = new client_1.PrismaClient();
UserService.createUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserService.prisma.user.create({
        data: newUser
    });
});
UserService.deleteUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserService.prisma.user.delete({
        where: {
            id: userId
        }
    });
});
UserService.updateUser = (updatedUser) => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserService.prisma.user.update({
        where: {
            id: updatedUser.id
        },
        data: updatedUser
    });
});
UserService.findById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserService.prisma.user.findUnique({
        where: {
            id: userId
        }
    });
});
UserService.getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserService.prisma.user.findMany();
});
UserService.updateAvatarById = (userId, avatar_url) => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserService.prisma.user.update({
        where: {
            id: userId
        },
        data: {
            avatar_url: avatar_url
        }
    });
});
