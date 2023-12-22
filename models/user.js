import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is required"]
    },
    email: {
        type: String,
        require: [true, "Email is required"]
    },
    password: {
        type: String,
        require: [true, "Password is required"]
    },
    loginType: {
        type: String,
        require: [true, "loginType is required"]
    }
}, { timestamps: true })

const User = models.User || mongoose.model("User", userSchema);
export default User