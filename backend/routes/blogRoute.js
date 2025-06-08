import express from "express";
import { addBlog, getAllBlogs, getBlogById, deleteBlogById, togglePublishStatus, addComment, getBlogComments, generateBlogContent } from "../controller/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
const blogRouter = express.Router();

blogRouter.post("/add", auth, upload.single("image"), addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.delete("/:blogId", auth, deleteBlogById);
blogRouter.put("/:blogId/toggle-publish", auth, togglePublishStatus);
blogRouter.delete("/:blogId", auth, deleteBlogById);
blogRouter.post("/generate-content", generateBlogContent);

//comments routes
blogRouter.post("/add-comment", addComment);
blogRouter.post("/comments", getBlogComments);

export default blogRouter;

