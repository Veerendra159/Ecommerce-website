import { user_model } from "../models/user.js";


export const admin_protect = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.json({
            message: "admin can only access"
        })
    }
    next();
}