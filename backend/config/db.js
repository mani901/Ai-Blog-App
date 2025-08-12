import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const getMongoUri = () => {
    // Support multiple common variable names to be deployment-friendly (Railway, Render, Vercel, etc.)
    const uri =
        process.env.MONGO_URI ||
        process.env.MONGODB_URI ||
        process.env.DATABASE_URL ||
        process.env.MONGODB_URL ||
        "";

    return uri.trim();
};

const connectDB = async () => {
    try {
        const mongoUri = getMongoUri();
        const dbName = process.env.MONGO_DB_NAME || undefined; // Optional override if URI doesn't include db

        if (!mongoUri) {
            throw new Error(
                "Missing MongoDB connection string. Set one of MONGO_URI, MONGODB_URI, DATABASE_URL, or MONGODB_URL."
            );
        }

        // Basic sanity check to catch common misconfigurations early
        if (!mongoUri.startsWith("mongodb://") && !mongoUri.startsWith("mongodb+srv://")) {
            throw new Error(
                "Invalid connection string scheme. Expected it to start with 'mongodb://' or 'mongodb+srv://'."
            );
        }

        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected");
        });
        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err?.message || err);
        });

        // Do not append a database path to the URI. Use dbName option when provided.
        await mongoose.connect(mongoUri, dbName ? { dbName } : undefined);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;
