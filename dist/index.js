"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("./api"));
const environment_1 = require("./environment");
// // Start API Service
api_1.default.listen(environment_1.Environment.server.port, () => {
    console.info(`API Server started`);
    console.info(`  Port: ${environment_1.Environment.server.port}`);
    console.info(`  Server Environment: ${environment_1.Environment.server.node_env}`);
    console.info(`  Server Mode: ${environment_1.Environment.server.mode}`);
});
