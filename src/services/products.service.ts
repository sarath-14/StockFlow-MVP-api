import { Types } from "mongoose";
import { IProduct, Product } from "../models/product.model";

export const getProductsWithFilters = async (filters: { [key: string]: string }) => {
    const { search, organizationId } = filters;
    const limit = parseInt(filters['limit'] as string);

    const matchQuery: { [key: string]: any } = {
        '$and': [{ organizationId: new Types.ObjectId(organizationId) }, { isDeleted: false }]
    }

    if(search?.length) {
        const searchTerm = new RegExp(search, 'i');
        const searchQuery: { [key: string]: any } = {};
        searchQuery['$or'] = [];
        searchQuery['$or'].push({ name: { $regex: searchTerm } });
        searchQuery['$or'].push({ sku: { $regex: searchTerm } });

        matchQuery['$and'].push(searchQuery);
    }

    const result = await Product.aggregate([
        {
            '$match': matchQuery
        },
        {
            '$sort': {
                'createdAt': -1
            }
        }
    ]);

    return result;
}

export const getTotalProductsCount = async (filters: { [key: string]: string }) => {
    const { search, organizationId } = filters;

    const matchQuery: { [key: string]: any } = {
        '$and': [{ organizationId: new Types.ObjectId(organizationId) }, { isDeleted: false }]
    }

    if(search?.length) {
        const searchTerm = new RegExp(search, 'i');
        const searchQuery: { [key: string]: any } = {};
        searchQuery['$or'] = [];
        searchQuery['$or'].push({ name: { $regex: searchTerm } });
        searchQuery['$or'].push({ sku: { $regex: searchTerm } });

        matchQuery['$and'].push(searchQuery);
    }

    const result = await Product.aggregate([
        {
            '$match': matchQuery
        }
    ]);

    return result.length;
}

export const handleCreateProduct = async (product: IProduct) => {
    const { organizationId } = product;
    if(organizationId) {
        const isSkuExists = await Product.findOne({ sku: product.sku, organizationId });
        if(isSkuExists && (product._id==undefined || product._id.toString() !== isSkuExists._id.toString())) {
            throw new Error(`Product with ${product.sku} SKU already exists`);
        }
    }
    if(product._id) {
        await Product.findOneAndUpdate({ _id: product._id }, { $set: product }, { upsert: true, new: true });
    }
    else {
        await Product.create(product);
    }
    return true;
}

export const handleDeleteProduct = async (data: { id: string, user: string }) => {
    const { id, user } = data;
    await Product.findByIdAndUpdate(id, { $set: { isDeleted: true, updatedBy: user } })
    return true;
}