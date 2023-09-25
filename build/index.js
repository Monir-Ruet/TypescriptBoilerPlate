"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("module-alias/register");
require("dotenv/config");
const route_controller_1 = __importDefault(require("@/Routes/Route/route.controller"));
const controller = [route_controller_1.default];
const app = new app_1.default(controller, Number(process.env.PORT || 3000));
app.listen();
