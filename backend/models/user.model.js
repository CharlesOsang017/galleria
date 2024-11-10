import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        default: ""
    },
    about: {
        type: String,
        default: ''

    },
    skills: {
        type: String,
        default: ''
    },
    likedPosts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
          default: [],
        },
      ],
    

}, {timestamps: true})

const User = mongoose.model("User", userSchema)
export default User