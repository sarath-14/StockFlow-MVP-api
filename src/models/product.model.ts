import { Document, Schema, Types } from "mongoose";
import { IOrganization } from "./organization.model";
import { IUser } from "./user.model";

export interface IProduct extends Document {
    organizationId: string | Types.ObjectId | IOrganization;
    name: string;
    sku: string;
    quantity: number;
    description?: string;
    cost?: number;
    sellingPrice?: number;
    threshold?: number;
    updatedBy: string | Types.ObjectId | IUser;
    createdAt?: Date;
    updatedAt?: Date;
}

const productSchema = new Schema<IProduct>({
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    name: { type: String, required: true, trim: true },
    sku: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, default: 0 },
    description: { type: String, trim: true },
    cost: { type: Number, default: 0 },
    sellingPrice: { type: Number, default: 0 },
    threshold: { type: Number, default: 0 },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

productSchema.index({ name: 1, organizationId: 1 }, { unique: true });
productSchema.index({ organizationId: 1, sku: 1 }, { unique: true });