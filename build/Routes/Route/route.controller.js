"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const Response_1 = __importDefault(require("@/Resources/Response"));
class Route {
    constructor() {
        this.path = 'route';
        this.router = (0, express_1.Router)();
        this.initializeRouter();
    }
    initializeRouter() {
        this.router.get("/", (req, res, next) => {
            return next(new Response_1.default(200, 'S', {}));
        });
    }
}
module.exports = new Route();
