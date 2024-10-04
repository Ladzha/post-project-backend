import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    favoritePosts: {
        type: [{
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Post',
        }]
    }
    // {
    //     toJSON: {virtuals: true},
    //     toObject: {virtuals: true}}
})

// userSchema.virtual('allPostByUser', {
//     ref: "Post",
//     localField: __id,
//     foreignField: "author"

// }), 

userSchema.virtual("allPostsByUser").get(function (){
    return `I return all ${this.name} posts`
})

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