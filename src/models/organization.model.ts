import { Document, model, Model, Schema } from "mongoose";
import { Settings } from "./settings.model";

export interface IOrganization extends Document {
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const organizationSchema = new Schema<IOrganization>({
    name: { type: String, required: true, trim: true }
}, { timestamps: true });

organizationSchema.index({ name: 1 }, { unique: true });

organizationSchema.post('save', async (doc) => {
    if(doc && doc._id) {
        const settings = {
            organizationId: doc._id,
            threshold: 5
        }

        await Settings.create(settings);
    }
})

export const Organization: Model<IOrganization> = model<IOrganization>('Organization', organizationSchema);


