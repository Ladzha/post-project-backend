import mongoose from "mongoose";
import CategoryModel from "../models/categoryModel.js"

export async function getAllCategories(request, response) {
    try {
        const categories = await CategoryModel.find();
        if(!categories.length) return response.status(404).json({message: "No categories found in the database."});
        response.status(200).json(categories); 
    } catch (error) {
        response.status(500).json({message: "Server error while retrieving categories.", error: error.message});
    } 
}

export async function createCategory(request, response) {
    try {
        const categoryInfo = request.body;
        if(!categoryInfo) return response.status(400).json({message: "Request body is missing or invalid."});
        const newCategory = await CategoryModel.create(categoryInfo);
        if(!newCategory) return response.status(400).json({message: "Failed to create a new category."});
        response.status(201).json({message: "New category successfully created.", data: `${newCategory}`});
    } catch (error) {
        response.status(400).json({message: "Server error while creating category.", error: error.message});
    } 
}

export async function getCategoryById(request, response) {
    try {
        const id = request.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)) return response.status(400).json({message: "Invalid ID format."});     
        const category = await CategoryModel.findById(id);
        if(!category) return response.status(404).json({message: `Category with ID: ${id} not found.`});
        response.status(200).json(category)    
    } catch (error) {
        response.status(500).json({message: "Server error while retrieving category.", error: error.message})
    }
}

export async function updateCategoryById(request, response) {
    try {
        const id = request.params.id;
        const newData = request.body;
        if(!mongoose.Types.ObjectId.isValid(id) || !newData) return response.status(400).json({message: "Invalid ID or data format."});
        const updatedCategory = await CategoryModel.findByIdAndUpdate(id, newData, {new: true});
        if(!updatedCategory) return response.status(404).json({message: `Category with ID: ${id} not found.`});
        response.status(200).json({message: `Category with ID: ${id} successfully updated.`, data: `${updatedCategory}`})
    } catch (error) {
        response.status(500).json({message: "Server error while updating category.", error: error.message})
    }
}

export async function deleteCategoryById(request, response) {
    try {
        const id = request.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)) return response.status(400).json({message: "Invalid ID format."});     
        const deleteCategory = await CategoryModel.findByIdAndDelete(id);
        if(!deleteCategory) return response.status(404).json({message: `Category with ID: ${id} not found.`});
        response.status(200).json({message: `Category with ID: ${id} successfully deleted.`}); 
    } catch (error) {
        response.status(500).json({message: "Server error while deleting category.", error: error.message})
    }
}
