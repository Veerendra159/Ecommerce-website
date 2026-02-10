import { get_products, add_products, get_admin_products,updateProducts_details } from "../controllers/productsController.js";
import { admin_protect } from "../middlewares/adminMiddleware.js";
import { protect } from "../middlewares/authmiddleware.js";
// import { upload } from "../middlewares/imgMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/product/add", protect, admin_protect, /*upload.array("image", 5), */add_products)
router.get("/product/:name", protect ,admin_protect, )
router.get("/product/:name", protect, admin_protect, get_admin_products)
router.patch("/product/:id", protect, admin_protect, updateProducts_details)

export default router;