import { register_User, login_protect } from "../controllers/authController.js";
import { protect, registerCheck } from "../middlewares/authmiddleware.js";
import { update_details , Delete_user} from "../controllers/authController.js";
import express from "express";

const router = express.Router();


router.post("/register", registerCheck, register_User);
router.get("/login", protect, login_protect);
router.patch("/login/update", protect, update_details);
router.delete("/login/delete",protect , Delete_user)


export default router;
