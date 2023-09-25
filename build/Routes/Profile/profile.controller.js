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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const signup_model_1 = __importDefault(require("@/Routes/Signup/signup.model"));
const httpexception_1 = __importDefault(require("@/Resources/httpexception"));
const authentication_service_1 = require("../Services/authentication.service");
class Profile {
    constructor() {
        this.path = 'user';
        this.router = (0, express_1.Router)();
        this.initializeRouter();
    }
    initializeRouter() {
        this.router.get('/', [authentication_service_1.isAuthorized], (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                var LoggedUser = yield signup_model_1.default.findOne({ username: req.body.username });
                if (LoggedUser) {
                    const { username, fullname, email, gender } = LoggedUser;
                    LoggedUser = { fullname, username, email, gender };
                    console.log(LoggedUser);
                    return res.send({
                        status: 200,
                        user: LoggedUser
                    });
                }
                else {
                    next(new httpexception_1.default(400, 'No account found'));
                }
            }
            catch (err) {
                next(err);
            }
        }));
    }
}
module.exports = Profile;
