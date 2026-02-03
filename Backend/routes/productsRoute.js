import { add_products } from "../controllers/productsController.js";
import { get_products } from "../controllers/productsController.js";
import { admin_protect } from "../middlewares/adminMiddleware.js";
import { protect } from "../middlewares/authmiddleware.js";
// import { upload } from "../middlewares/imgMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/add", protect, admin_protect, /*upload.array("image", 5), */add_products)
router.get("/product/:name", protect, get_products)

export default router;