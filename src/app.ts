import express, { Application } from "express";
import cors from 'cors';
import 'module-alias/register'
import 'dotenv/config'
import ErrorMiddleware from '@/Middleware/Error.middleware'
import Controller from '@/Interfaces/controller.interface'

class App {
    public express: Application;
    public port: number;
    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;
        this.initializeMiddleware();
        this.initializeController(controllers);
        this.initializeErrorHandling();
    }
    private initializeMiddleware(): void {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    }
    private initializeErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }
    private initializeController(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/' + controller.path, controller.router);
        })
    }
    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`Server running on ${this.port}`)
        })
        this.express.get('/', (req, res) => {
            res.send("Hello\n");
        })
    }
}

export default App;
