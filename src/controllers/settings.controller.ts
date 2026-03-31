import { Controller, Get, Post } from "@overnightjs/core";
import { IRequest } from "../shared/types";
import { getSettingsDoc, updateSettingsOfOrganization } from "../services/settings.service";
import { Response } from "express";
import { sendResponse } from "../middlwares/response.middlware";

@Controller('settings')
export class SettingsController {

    @Get('')
    async getSettings(req: IRequest, res: Response) {
        const organization = req.auth.organization;
        const result = await getSettingsDoc(organization);
        sendResponse(res, result);
    }

    @Post('')
    async updateSettings(req: IRequest, res: Response) {
        const { user, organization } = req.auth;
        const { threshold } = req.body;
        const result = await updateSettingsOfOrganization({
            organization,
            user,
            threshold
        })
        sendResponse(res, result);
    }
}