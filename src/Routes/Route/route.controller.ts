import Controller from "@/Interfaces/controller.interface";
import { Router, Request, Response, NextFunction } from "express";

class Route implements Controller {
    path: string;
    router: Router;
    constructor() {
        this.path = 'route';
        this.router = Router();
        this.initializeRouter();
    }
    private initializeRouter() {
        this.router.get("/", (req, res) => {
            res.send({});
        })
    }

}
export = new Route();