import mongoose from "mongoose";

const products_schema = new mongoose.Schema({
    token: {
        type: String
    },
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    countInStock: {
        type: Number,
        require: true
    }
})

export const products_model = new mongoose.model("products", products_schema)