import * as jwt from "jsonwebtoken";
import 'dotenv/config'
import { NextFunction, Request, RequestHandler, Response } from "express";
import HttpException from "@/Resources/httpexception";

interface Payload {
	username: string
}
function GenerateToken(payload: Payload): string {
	const secretKey: string = process.env.ACCESS_TOKEN_SECRET!;
	return jwt.sign(payload, secretKey, { expiresIn: '2592000s' });
}


const isAuthorized = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		let token: string = <string>req.get('authorization');
		if (!token || token.slice(0, 6) != 'Bearer') throw new Error();
		token = token.split(' ')[1];
		const secretKey: string = process.env.ACCESS_TOKEN_SECRET!;
		let result: Payload = <Payload>await jwt.verify(token, secretKey);
		req.body.username = result.username;
		next();
	}
	catch (err) {
		next(new HttpException(400, 'Please provide a valid authorization token'));
	}
}
export {
	GenerateToken,
	isAuthorized
}