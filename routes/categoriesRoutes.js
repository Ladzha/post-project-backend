import { getAllCategories, createCategory, getCategoryById, updateCategoryById, deleteCategoryById } from "../controllers/categoryController.js"
import express from "express";

const categoryRouter = express.Router();


categoryRouter.route('/')
.get(getAllCategories)
.post(createCategory)

categoryRouter.route('/:id')
.get(getCategoryById)
.patch(updateCategoryById)
.delete(deleteCategoryById)


export default categoryRouter;

