import { getAllPosts, createPost, getPostById, updatePostById, deletePostById } from "../controllers/postController.js";
import express from "express";

const postRouter = express.Router();

postRouter.route('/')
.get(getAllPosts)
.post(createPost)

postRouter.route('/:id')
.get(getPostById)
.patch(updatePostById)
.delete(deletePostById)


export default postRouter;
