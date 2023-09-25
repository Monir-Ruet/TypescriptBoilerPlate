"use strict";
const express_1 = require("express");
class Route {
    constructor() {
        this.path = 'route';
        this.router = (0, express_1.Router)();
        this.initializeRouter();
    }
    initializeRouter() {
        this.router.get("/", (req, res) => {
            res.send({});
        });
    }
}
module.exports = new Route();
