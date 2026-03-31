import { Request } from "express";

export interface IAuth {
    user: string;
    organization: string;
}

export interface IRequest extends Request {
    auth: IAuth
}