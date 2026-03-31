import { Controller, Middleware, Post } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import { handleUserLogin, handleUserSignUp } from "../services/auth.service";
import { errorMiddleware, sendResponse } from "../middlwares/response.middlware";

@Controller('public/auth')
export class AuthenticationController {

    @Post('login')
    async loginUser(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        const result = await handleUserLogin({ email, password });
        sendResponse(res, result);
    }

    @Post('sign-up')
    async signUpUser(req: Request, res: Response) {
        const { email, password, organization } = req.body;
        const result = await handleUserSignUp({ email, password, organization });
        sendResponse(res, result);
    }
}