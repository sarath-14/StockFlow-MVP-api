import { config } from "../config";
import { IUser } from "../models/user.model";
import jwt, { Algorithm } from "jsonwebtoken";

export const generateJwtToken = (user: IUser) => {
    const payload = {
        user: user._id.toString(),
        email: user.email,
        organization: user.organizationId.toString()
    }

    const token = jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: '7d',
        algorithm: config.JWT_ALGORITHM as Algorithm
    })

    return token;
}