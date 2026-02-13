import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                require: true
            },
            quantity: {
                type: Number,
                require: true,
                default: 1
            }
        }
    ],
    totalAmount: {
        type: Number,
        require: true
    },
    // createdBy:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "users",
    //     require: true

    // },
    status: {
        type: String,
        enum: ["pending", "shipped", "paid", "delivered"],
        default: "pending"
    }
})

export const orders_model = new mongoose.model("orders", orderSchema)