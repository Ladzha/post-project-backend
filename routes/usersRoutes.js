import { getAllUsers, createUser, getUserById, updateUserById, deleteUserById } from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();

userRouter.route('/')
.get(getAllUsers)
.post(createUser)

userRouter.route('/:id')
.get(getUserById)
.patch(updateUserById)
.delete(deleteUserById)


export default userRouter;