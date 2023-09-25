import { Request, Response, NextFunction } from "express";
import RESPONSE from "@/Resources/Response";

function ErrorMiddleware(
    error: RESPONSE,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).send({
        status,
        message,
        data: {}
    })
}

export default ErrorMiddleware;