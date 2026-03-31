import { Settings } from "../models/settings.model"

export const getSettingsDoc = async (organizationId: string) => {
    return Settings.findOne({ organizationId });
}

export interface IUpdateSettingsArgs {
    organization: string;
    user: string;
    threshold: number;
}

export const updateSettingsOfOrganization = async (data: IUpdateSettingsArgs) => {
    const { organization, user, threshold } = data;

    if(threshold < 0) {
        throw new Error('Threshold cannot be less than 0');
    }

    const updatedSettings = await Settings.findOneAndUpdate({ organizationId: organization }, { $set: { threshold, updatedBy: user } }, { upsert: true });
    return updatedSettings;
}