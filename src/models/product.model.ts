import { Document, model, Model, Schema, Types } from "mongoose";
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
    isDeleted: boolean;
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
    cost: { type: Number },
    sellingPrice: { type: Number },
    threshold: { type: Number },
    isDeleted: { type: Boolean, default: false },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

productSchema.index({ organizationId: 1, sku: 1 }, { unique: true });

export const Product: Model<IProduct> = model<IProduct>('Product', productSchema);