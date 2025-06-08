import Blog from "../models/Blog.js";
import getImageKit from "../config/imageKit.js";
import Comment from "../models/Comment.js";
import { generateContent } from "../config/gemini.js";

export const addBlog = async (req, res) => {
    try {
        // Handle both JSON and form-data
        let blogData;
        if (req.body.blog) {
            // If blog data is sent as a string (form-data), parse it
            blogData = typeof req.body.blog === 'string' ? JSON.parse(req.body.blog) : req.body.blog;
        } else {
            // If blog data is sent directly in body
            blogData = req.body;
        }



        const { title, subTitle, description, category, isPublished } = blogData;
        const imageFile = req.file;

        //check if all fields are present
        if (!title || !description || !category) {
            return res.status(400).json({ success: false, message: "Title, description, and category are required" });
        }

        if (!imageFile) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        //upload image to imagekit
        const imageKit = getImageKit();

        // Use buffer from memory storage instead of reading from file
        const response = await imageKit.upload({
            file: imageFile.buffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        //Optimization using imageKit
        const optimizedImageUrl = await imageKit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' },
                { format: 'webp' },
                { width: 1280 }
            ]
        });

        const image = optimizedImageUrl;

        //upload to mongoDB
        await Blog.create({ title, subTitle, description, category, image, isPublished });

        res.status(201).json({ success: true, message: "Blog created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true });
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json({ success: true, blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        await Blog.findByIdAndDelete(blogId);

        //delete all comments related to the blog
        await Comment.deleteMany({ blogId });

        res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const togglePublishStatus = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.status(200).json({ success: true, message: "Blog published status updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// comments controller functions
export const addComment = async (req, res) => {
    try {
        const { blogId, name, content } = req.body;
        const comment = await Comment.create({ blogId, name, content });
        res.status(201).json({ success: true, message: "Comment added for review" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body;
        const comments = await Comment.find({ blogId, isApproved: true }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const generateBlogContent = async (req, res) => {
    try {
        const { prompt } = req.body;
        const GEMINI_FORMATTING_INSTRUCTIONS = `
        IMPORTANT FORMATTING INSTRUCTIONS:
        - Return the response in properly formatted HTML
        - Use <h1>, <h2>, <h3> for headings
        - Use <p> for paragraphs
        - Use <ul><li> for bullet points
        - Use <ol><li> for numbered lists
        - Use <strong> for bold and <em> for italics
        - Use <u> for underlines
        - Use <br> for line breaks when needed
        - Never add <html>, <head>, or <body> tags
        - Ensure all tags are properly closed
        `;
        const content = await generateContent("title : " + prompt + "generate a blog content for this topic in professional way in simple text format" + GEMINI_FORMATTING_INSTRUCTIONS);

        res.status(200).json({ success: true, content });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
