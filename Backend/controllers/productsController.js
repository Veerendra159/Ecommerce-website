import { products_model } from "../models/products.js";


//  post products || add products by admin only
export const add_products = async (req, res) => {
    try {
        const adminID = req.user._id;
        const { name, price, description, countInStock } = req.body;
        if (!name || !price || !description || countInStock === undefined) {
            return res.status(400).json({
                message: "requied all details , please check it once"
            })
        }
        const post = await products_model.create({
            name,
            price,
            description,
            countInStock,
            createdBy: adminID
        })
        return res.status(201).json({
            post,
            message: "your product has been added successfully"
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: err.message
        })
    }

}

//  get all products for admin only
export const get_admin_products = async (req, res) => {
    try {
        const adminID = req.user._id;
        const { name } = req.params;
        const products = await products_model.find({ name });
        console.log(adminID, name)
        console.log(products)
        res.status(200).json({
            message: "your product details",
            products
        })
    } catch (err) {
        console.log("error", err.message);
        return res.status(500).json({
            message: err.message
        })
    }
}

// get products
export const get_products = async (req, res) => {
    try {
        const name = req.params.name;
        const products = await products_model.find({ name: name })
        if (!products) {
            return res.json({
                message: "products not found"
            })
        }
        return res.status(200).json(products)
    } catch (err) {
        console.log("error", err.message)
        return res.json({
            message: "an internal error occured"
        })
    }
}

// update products details by admin
export const updateProducts_details = async (req, res) => {
    try {
        const productId = req.params.id
        const adminID = req.user._id;
        const { name, price, description, countInStock } = req.body;
        const update_details = {
            name,
            price,
            description,
            countInStock
        }
        const product = await products_model.findOneAndUpdate(
            { _id: productId, createdBy: adminID },
            update_details,
            { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        console.log("Product in DB:", product);
        res.json({
            product,
            message: "products details are updated"
        })
    } catch (err) {
        console.log("error", err.message);
        return res.status(500).json({
            message: err.message
        })
    }

}

// DELETE PRODUCTS BY ADMIN ONLY
export const delete_product = async (req, res) => {
    try {
        const adminId = req.user._id;
        const productId = req.params.id;
        const delete_details = await products_model.findOneAndDelete({ _id: productId, createdBy: adminId })
        if (!delete_details) {
            return res.status(404).json({
                message: "products not found"
            })
        }
        return res.status(200).json({
            message: "products details are deleted successfully"
        })
    } catch (err) {
        console.log("error", err.message);
        return res.status(500).json({
            message: err.message
        })
    }
}