import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(200).json({ success: false, message: "Invalid email or password" });
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ success: true, message: "Admin login successful", token });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getAllCommentsAdmin = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate("blogId").sort({ createdAt: -1 });
        res.status(200).json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


export const getDashbaord = async (req, res) => {
    try {
        // Execute the query to get the actual blog documents
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5).lean();
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({ isPublished: false });

        const dashboardData = {
            recentBlogs, // Now contains the actual blog documents
            blogs,
            comments,
            drafts
        };

        res.status(200).json({ success: true, dashboardData });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteCommentById = async (req, res) => {
    try {
        console.log("delete comment called");
        const { commentId } = req.body;
        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({ success: true, message: "Comment deleted successfully" });
        console.log("comment deleted successfully");
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log("error in delete comment", error);
    }
}

export const approveCommentById = async (req, res) => {
    try {
        const { commentId } = req.body;
        await Comment.findByIdAndUpdate(commentId, { isApproved: true });
        res.status(200).json({ success: true, message: "Comment approved successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}