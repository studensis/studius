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
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const user_service_1 = require("./services/user/user.service");
// Kakti API gateway
// https://www.partech.nl/nl/publicaties/2020/07/9-trending-best-practices-for-rest-api-development#
// POST — add new data.
// PUT — replace existing data.
// PATCH — update some existing data fields.
// DELETE — delete existing data.
exports.default = (server) => {
    server.get('/', (req, res) => {
        res.send('Hello World!');
    });
    server.route('/users').get((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('/users GET');
        try {
            let users = yield user_service_1.UserService.getAllUsers();
            return res.send(users);
        }
        catch (_a) {
            return res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }));
    server.route('/users/:userId').get((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('/users/:userId GET');
        try {
            let id = Number(_req.params.userId);
            let user = yield user_service_1.UserService.findById(id);
            return res.send(user);
        }
        catch (_b) {
            return res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }));
    server.route('/users').post((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('/users POST');
        try {
            let newUser = {
                id: 9,
                email: _req.query.email,
                password: _req.query.password,
                name: _req.query.name,
                surname: _req.query.surname,
                username: _req.query.username,
                JMBAG: _req.query.JMBAG,
                avatar_url: _req.query.avatar_url,
                role: _req.query.role
            };
            let user = yield user_service_1.UserService.createUser(newUser);
            return res.send(user);
        }
        catch (_c) {
            return res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }));
};
