import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoute.js";
import blogRoutes from "./routes/blogRoute.js";
const app = express();

const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
    origin: ["http://localhost:5173", "https://ai-blog-app-two.vercel.app"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));  // Apply the CORS configuration


app.get("/", (req, res) => {
    res.send("Api is working");
});

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/blog", blogRoutes);

app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Failed to connect to database:', error.message);
        process.exit(1);
    }
});

export default app;