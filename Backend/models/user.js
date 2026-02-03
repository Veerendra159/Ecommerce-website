import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        require: true
    },
    Age:{
        type: Number,
        require: true,
    },
    Email: {
        type: String,
        require: true
    },
    Password: {
        type: String,
        require: true
    },
    Phone: {
        type: Number,
        require: true
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        // default: "user"
    }
})

export const user_model = new mongoose.model("User", userSchema)