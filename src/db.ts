import mongoose from "mongoose";
import { config } from "./config";

const connectToDatabase = async () => {
  try {
    let dbUrl = config.DATABASE_URL;
    
    await mongoose.connect(dbUrl);
    console.log('Database connected ✅');

  } catch (error) {
    console.error('error connecting to Database ❌');
    process.exit(1);
  }
};

export default connectToDatabase;