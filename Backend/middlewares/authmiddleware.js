import { user_model } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// register middleware
export const registerCheck = async (req, res, next) => {
  try {
    const { Name, Age, Email, Password, Phone, role } = req.body;
    if (!Name || !Age || !Email || !Password || !Phone || !role) {
      return res.status(400).json({
        error: "bad request !",
        message: "required all fields"
      })
    }
    const existing = await user_model.findOne({ Email })
    if (existing) {
      return res.status(409).json("user already registered")
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(Password, salt);

    req.userData = {
      Name,
      Age,
      Email,
      Password: hash,
      Phone,
      role
    }
    next();
  } catch (err) {
    console.log("error", err.message);
    res.status(500).json({
      message: err.message
    })
  }

}


//login middleware

export const protect = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({
        message: "Token missing"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await user_model.findById(decoded.id).select("-Password");

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    req.user = user; //  KEY LINE
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};
