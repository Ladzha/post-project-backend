import mongoose from "mongoose";
import UserModel from "../models/userModel.js"


export async function getAllUsers(request, response) {
    try {
        const users = await UserModel.find().populate("favoritePosts").populate("allPostByUser");
        if(!users.length) return response.status(404).json({message: "No users found in the database."});
        response.status(200).json(users); 
    } catch (error) {
        response.status(500).json({message: "Server error while retrieving users.", error: error.message});
    } 
}

export async function createUser(request, response) {
    try {
        const userInfo = request.body;
        if(!userInfo) return response.status(400).json({message: "Request body is missing or invalid."});
        const newUser = await UserModel.create(userInfo);
        if(!newUser) return response.status(400).json({message: "Failed to create a new user."});
        response.status(201).json({message: "New user successfully created.", data: `${newUser}`});
    } catch (error) {
        response.status(400).json({message: "Server error while creating user.", error: error.message});
    } 
}

export async function getUserById(request, response) {
    try {
        const id = request.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)) return response.status(400).json({message: "Invalid ID format."});     
        const user = await UserModel.findById(id).populate("favoritePosts").populate("allPostByUser");
        if(!user) return response.status(404).json({message: `User with ID: ${id} not found.`});
        response.status(200).json(user)    
    } catch (error) {
        response.status(500).json({message: "Server error while retrieving user.", error: error.message})
    }
}

export async function updateUserById(request, response) {
    try {
        const id = request.params.id;
        const newData = request.body;
        if(!mongoose.Types.ObjectId.isValid(id) || !newData) return response.status(400).json({message: "Invalid ID or data format."});
        let updatedUser;
        if(newData.favoritePosts){
            updatedUser = await UserModel.findById(id)
            updatedUser.favoritePosts.push(newData.favoritePosts)
            updatedUser.save()
        }else{
            updatedUser = await UserModel.findByIdAndUpdate(id, newData, {new: true});
        }
        if(!updatedUser) return response.status(404).json({message: `User with ID: ${id} not found.`});
        response.status(200).json({message: `User with ID: ${id} successfully updated.`, data: `${updatedUser}`})
    } catch (error) {
        response.status(500).json({message: "Server error while updating user.", error: error.message})
    }
}

export async function deleteUserById(request, response) {
    try {
        const id = request.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)) return response.status(400).json({message: "Invalid ID format."});     
        const deleteUser = await UserModel.findByIdAndDelete(id);
        if(!deleteUser) return response.status(404).json({message: `User with ID: ${id} not found.`});
        response.status(200).json({message: `User with ID: ${id} successfully deleted.`}); 
    } catch (error) {
        response.status(500).json({message: "Server error while deleting user.", error: error.message})
    }
}