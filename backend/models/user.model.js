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
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6LXNJFTmLzCoExghcATlCWG85kI8dsnhJng&s"
    },
    location: {
        type: String,
        default: 'Add location'
    },
    about: {
        type: String,
        default: 'Add about you'

    },
    skills: {
        type: String,
        default: 'Add skills'
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