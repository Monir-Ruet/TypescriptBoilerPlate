import Controller from "@/Interfaces/controller.interface";
import { Router, Request, Response, NextFunction } from "express";

import RESPONSE from "@/Resources/Response";

class Route implements Controller {
    path: string;
    router: Router;
    constructor() {
        this.path = 'route';
        this.router = Router();
        this.initializeRouter();
    }
    private initializeRouter() {
        this.router.get("/", (req, res, next) => {
            return next(new RESPONSE(200, 'S', {}))
        })
    }

}
export = new Route();