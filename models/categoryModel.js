import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
    }
})

categorySchema.virtual("allPosts").get(function (){
    return "I return all posts in this category"
})

export default mongoose.model("Category", categorySchema)