import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected");
        });
        await mongoose.connect(`${process.env.MONGO_URI}/quickBlog`);
    } catch (error) {
        console.log("MongoDB connection failed", error.message);
        process.exit(1);
    }
}

export default connectDB;