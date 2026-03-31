import { Document, model, Model, Schema, Types } from "mongoose";
import { settings } from "node:cluster";
import { IOrganization } from "./organization.model";
import { IUser } from "./user.model";

export interface ISettings extends Document {
    threshold: number;
    organizationId: string | Types.ObjectId | IOrganization;
    updatedBy: string | Types.ObjectId | IUser;
    createdAt?: Date;
    updatedAt?: Date;
}

const settingsSchema = new Schema<ISettings>({
    threshold: { type: Number, required: true, default: 5 },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const Settings: Model<ISettings> = model<ISettings>('Settings', settingsSchema);