import { Controller, Get, Post } from "@overnightjs/core";
import { IRequest } from "../shared/types";
import { Response } from "express";
import { getProductsWithFilters, getTotalProductsCount, handleCreateProduct, handleDeleteProduct } from "../services/products.service";
import { sendResponse } from "../middlwares/response.middlware";

@Controller('products')
export class ProductController {

    @Get('')
    async getProducts(req: IRequest, res: Response) {
        const data = {
            ...req.query,
            organizationId: req.auth.organization
        };
        const result = await getProductsWithFilters(data);
        sendResponse(res, result);
    }

    @Get('count')
    async getTotalProductsCount(req: IRequest, res: Response) {
        const data = {
            ...req.query,
            organizationId: req.auth.organization
        }
        const result = await getTotalProductsCount(data);
        sendResponse(res, result);
    }

    @Post('')
    async createProduct(req: IRequest, res: Response) {
        const data = {
            ...req.body,
            organizationId: req.auth.organization,
            updatedBy: req.auth.user
        }

        const result = await handleCreateProduct(data);
        sendResponse(res, result);
    }

    @Post('delete')
    async deleteProduct(req: IRequest, res: Response) {
        const { id } = req.body;
        const user = req.auth.user;

        const result = await handleDeleteProduct({ id, user });
        sendResponse(res, result);
    }
}