import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    favoritePosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

userSchema.virtual('allPostByUser', {
    ref: "Post",
    localField: "_id",
    foreignField: "author",
    justOne: false
}), 

userSchema.method('reset', function(email){
    if(!email){
        return
    }else{
        if(email === userSchema.email){
            return userSchema.password = '';
        }
        return 'You email is wrong.';
    }
})

export default mongoose.model("User", userSchema)