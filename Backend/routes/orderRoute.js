import { protect } from "../middlewares/authmiddleware.js";
import { admin_protect } from "../middlewares/adminMiddleware.js";
import { addOrders, getOrder } from "../controllers/ordercontroller.js";
import express from "express"
import { get } from "mongoose";

const router = express();

router.post("/AddOrders", protect, addOrders)
router.get("/GetORders", protect, getOrder)

export default router;