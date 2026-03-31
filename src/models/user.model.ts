import { Document, model, Model, Schema, Types } from "mongoose";
import { IOrganization, Organization } from "./organization.model";

export interface IUser extends Document {
    email: string;
    password: string;
    organizationId: string | Types.ObjectId | IOrganization;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, trim: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
    password: { type: String, required: true },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true }
}, { timestamps: true });

userSchema.index({ email: 1, organizationId: 1 }, { unique: true });

export const User: Model<IUser> = model<IUser>('User', userSchema);