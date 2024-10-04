import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        minLength: 5,
    },
    body: {
        type: String,
        required: true,
        minLength: 20,
    }, 
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
})


export default mongoose.model("Post", postSchema)