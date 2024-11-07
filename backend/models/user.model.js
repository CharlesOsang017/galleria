import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
    }

}, {timestamps: true})

const User = mongoose.model("User", UserSchema)
export default User