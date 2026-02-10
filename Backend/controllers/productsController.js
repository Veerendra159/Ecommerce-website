import { products_model } from "../models/products.js";


//  post products || add products
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
            createBy: adminID
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
    const { names } = req.params
    console.log(names)

    const adminID = req.user._id;
    const { name, price, description, countInStock } = req.body;
    const updating = {
        name,
        price,
        description,
        countInStock
    }
    console.log(updating)
    const update = await products_model.findOneAndUpdate({ createdBy: adminID, name: names }, updating, { new: true })
    res.json({
        update,
        message: "products details are updated"
    })
}