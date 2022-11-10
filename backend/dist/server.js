"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const create = (config) => {
    let server = (0, express_1.default)();
    // const port = 4000;
    server.set('env', config.env);
    server.set('port', config.port);
    server.set('hostname', config.hostname);
    (0, routes_1.default)(server);
};
