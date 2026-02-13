import { protect } from "../middlewares/authmiddleware.js";
import { admin_protect } from "../middlewares/adminMiddleware.js";
import { addOrders } from "../controllers/ordercontroller.js";
import express from "express"

const router = express();

router.post("/AddOrders", protect, addOrders)

export default router;