import dotenv from 'dotenv';
dotenv.config({ quiet: true });

export const config = {
    // ==================== general ====================
    PORT: process.env.PORT || 3000,

    // ==================== database ====================
    DATABASE_URL: process.env.DATABASE_URL || '',

    // ==================== jwt ====================
    JWT_SECRET: process.env.JWT_SECRET || '',
    JWT_ALGORITHM: process.env.JWT_ALGORITHM || '',
    SALT_ROUNDS: process.env.SALT_ROUNDS || '2',
    TOKEN_EXPIRY: process.env.TOKEN_EXPIRY || '7d'
}