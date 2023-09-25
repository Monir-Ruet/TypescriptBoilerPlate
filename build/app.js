"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("module-alias/register");
require("dotenv/config");
const Error_middleware_1 = __importDefault(require("@/Middleware/Error.middleware"));
class App {
    constructor(controllers, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.initializeMiddleware();
        this.initializeController(controllers);
        this.initializeErrorHandling();
    }
    initializeMiddleware() {
        this.express.use((0, cors_1.default)());
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
    }
    initializeErrorHandling() {
        this.express.use(Error_middleware_1.default);
    }
    initializeController(controllers) {
        controllers.forEach((controller) => {
            this.express.use('/' + controller.path, controller.router);
        });
    }
    listen() {
        this.express.listen(this.port, () => {
            console.log(`Server running on ${this.port}`);
        });
        this.express.get('/', (req, res) => {
            res.send("Hello\n");
        });
    }
}
exports.default = App;
