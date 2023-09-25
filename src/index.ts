import App from "./app";
import Controller from "@/Interfaces/controller.interface";
import 'module-alias/register'
import 'dotenv/config'
import Route from "@/Routes/Route/route.controller";

const controller: Controller[] = [Route];
const app = new App(controller, Number(process.env.PORT || 3000));

app.listen();
