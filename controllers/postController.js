import mongoose from "mongoose";
import PostModel from "../models/postModel.js"

export async function getAllPosts(request, response) {
    try {
        const posts = await PostModel.find();
        if(!posts.length) return response.status(404).json({message: "No posts found in the database."});
        response.status(200).json(posts); 
    } catch (error) {
        response.status(500).json({message: "Server error while retrieving posts.", error: error.message});
    } 
}

export async function createPost(request, response) {
    try {
        const postInfo = request.body;
        if(!postInfo) return response.status(400).json({message: "Request body is missing or invalid."});
        const newPost = await PostModel.create(postInfo);
        if(!newPost) return response.status(400).json({message: "Failed to create a new post."});
        response.status(201).json({message: "New post successfully created.", data: `${newPost}`});
    } catch (error) {
        response.status(400).json({message: "Server error while creating post.", error: error.message});
    } 
}

export async function getPostById(request, response) {
    try {
        const id = request.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)) return response.status(400).json({message: "Invalid ID format."});     
        const post = await PostModel.findById(id);
        if(!post) return response.status(404).json({message: `Post with ID: ${id} not found.`});
        response.status(200).json(post)    
    } catch (error) {
        response.status(500).json({message: "Server error while retrieving post.", error: error.message})
    }
}

export async function updatePostById(request, response) {
    try {
        const id = request.params.id;
        const newData = request.body;
        if(!mongoose.Types.ObjectId.isValid(id) || !newData) return response.status(400).json({message: "Invalid ID or data format."});
        const updatedPost = await PostModel.findByIdAndUpdate(id, newData, {new: true});
        if(!updatedPost) return response.status(404).json({message: `Post with ID: ${id} not found.`});
        response.status(200).json({message: `Post with ID: ${id} successfully updated.`, data: `${updatedPost}`})
    } catch (error) {
        response.status(500).json({message: "Server error while updating post.", error: error.message})
    }
}

export async function deletePostById(request, response) {
    try {
        const id = request.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)) return response.status(400).json({message: "Invalid ID format."});     
        const deletePost = await PostModel.findByIdAndDelete(id);
        if(!deletePost) return response.status(404).json({message: `Post with ID: ${id} not found.`});
        response.status(200).json({message: `Post with ID: ${id} successfully deleted.`}); 
    } catch (error) {
        response.status(500).json({message: "Server error while deleting post.", error: error.message})
    }
}

