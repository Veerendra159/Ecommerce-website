import { orders_model } from "../models/order.js";

// add order from customer
export const addOrders = async (req, res) => {
    try {
        const { products, totalAmount } = req.body;
        const userID = req.user._id;
        if (!products || !totalAmount) {
            return res.status(400).json({
                message: "required all fields to place a order"
            })
        }
        const create_order = await orders_model.create({
            user: userID,
            products,
            totalAmount,
            // createdBy: userID
        })
        return res.status(201).json({
            create_order,
            message: "order created successfully"
        })
    } catch (error) {
        console.log("error", error.message);
        return res.status(500).json({
            message: error.message
        })
    }

}

// get user order
export const getOrder = async (req, res) => {
    try {
        const userID = req.user._id;
        const findUser = await orders_model.findOne({ user: userID }).populate("products.productId")
        if (!findUser) {
            return res.status(400).json({
                message: "your order are not found"
            })
        }
        return res.status(200).json({
            findUser,
            message: "your orders"
        })
    } catch (error) {
        console.log("error", error.message);
        return res.status(500).json({
            message: error.message
        })
    }
}