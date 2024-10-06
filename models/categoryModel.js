import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

categorySchema.virtual('allPostByCategory', {
    ref: "Post",
    localField: "_id",
    foreignField: "categories",
    justOne: false
});


export default mongoose.model("Category", categorySchema)