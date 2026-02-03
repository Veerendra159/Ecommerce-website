import { products_model } from "../models/products.js";


//  post products || add products
export const add_products = async (req, res) => {
    try {
        const { name, price, description, countInStock } = req.body;
        if (!name || !price || !description || !countInStock) {
            return res.status(400).json({
                message: "requied all details , please check it once"
            })
        }
        const post = await products_model.create({
            name,
            price,
            description,
            countInStock
        })
        return res.status(200).json({
            post,
            message: "product add"
        })
    } catch (err) {
        console.log(err.message);
        res.end("internal server errror", err.message)
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