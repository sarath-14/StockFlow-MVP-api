import { NextFunction, Request, Response } from "express";
import { IRequest } from "../shared/types";

export const errorMiddleware = (error: any, req: Request | IRequest, res: Response, next: NextFunction) => {

    const message = error.message || 'Internal Server Error';
    const status = error.status || 500;

    console.error(message);
    res.status(status).json({
        success: false,
        message
    })
};

export const sendResponse = (res: Response, data: any, message = 'Success', status = 200) => {
    res.status(status).json({
        success: true,
        message,
        data
    })
}