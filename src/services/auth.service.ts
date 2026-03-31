import { config } from "../config";
import { Organization } from "../models/organization.model";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { generateJwtToken } from "./helper.service";

export interface IHandleUserLoginArgs {
    email: string;
    password: string;
}

export const handleUserLogin = async (data: IHandleUserLoginArgs) => {
    try {
        const { email, password } = data;

        const user = await User.findOne({ email });
        if(!user) {
            throw new Error(`User with email ${email} does not exist`);
        }

        const compare = await bcrypt.compare(password, user.password);
        if(!compare) {
            throw new Error('Incorrect password');
        }

        const token = generateJwtToken(user);
        return { token };

    } catch (error: any) {
        throw new Error(error.message ?? 'handleUserLogin failed');
    }
}

export interface IHandleUserSignUpArgs extends IHandleUserLoginArgs {
    organization: string;
}

export const handleUserSignUp = async (data: IHandleUserSignUpArgs): Promise<{ token: string }> => {
    try {
        const { email, password, organization } = data;
    
        let organizationName = organization.charAt(0).toLocaleUpperCase() + organization.slice(1);
        
        const isOrganizationExists = await Organization.findOne({ name: organizationName });
        if(isOrganizationExists) {
            throw new Error(`${organizationName} already exists`);
        }
    
        const newOrganization = await Organization.create({ name: organizationName });

        const isUserExists = await User.findOne({ organizationId: newOrganization._id, email });
        if(isUserExists) {
            throw new Error(`User with ${email} already exists in ${newOrganization.name} organization`);
        }
    
        const saltRounds = parseInt(config.SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        const userDoc = {
            email,
            password: hashedPassword,
            organizationId: newOrganization._id
        }
    
        const newUser = await User.create(userDoc);
    
        const token = generateJwtToken(newUser);
        return { token };
        
    } catch (error: any) {
        throw new Error(error.message ?? 'handleUserSignUp failed');
    }
}