"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = exports.GenerateToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
require("dotenv/config");
const httpexception_1 = __importDefault(require("@/Resources/httpexception"));
function GenerateToken(payload) {
    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    return jwt.sign(payload, secretKey, { expiresIn: '2592000s' });
}
exports.GenerateToken = GenerateToken;
const isAuthorized = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.get('authorization');
        if (!token || token.slice(0, 6) != 'Bearer')
            throw new Error();
        token = token.split(' ')[1];
        const secretKey = process.env.ACCESS_TOKEN_SECRET;
        let result = yield jwt.verify(token, secretKey);
        req.body.username = result.username;
        next();
    }
    catch (err) {
        next(new httpexception_1.default(400, 'Please provide a valid authorization token'));
    }
});
exports.isAuthorized = isAuthorized;