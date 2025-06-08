import express from "express";
import { adminLogin, getAllBlogsAdmin, getAllCommentsAdmin, getDashbaord, deleteCommentById, approveCommentById } from "../controller/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.get("/comments", auth, getAllCommentsAdmin);
adminRouter.get("/dashboard", auth, getDashbaord);
adminRouter.delete("/delete-comment", auth, deleteCommentById);
adminRouter.put("/approve-comment", auth, approveCommentById);

export default adminRouter;

