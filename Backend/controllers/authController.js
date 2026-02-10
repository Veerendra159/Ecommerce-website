import { user_model } from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";


// register user by post method
export const register_User = async (req, res) => {
    try {
        const newUser = await user_model.create(req.userData)
        return res.status(200).json({
            message: "user created successfully",
            token: generateToken(newUser._id)
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
        console.log("error", error.message)
    }

}

// login user
export const login_protect = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const user = await user_model.findOne({ Email })
        if (!user) {
            return res.status(404).json({
                message: "user not  found"
            })
        }
        const ismatch = await bcrypt.compare(Password, user.Password)
        if (!ismatch) {
            return res.status(500).json({
                message: "incorrect details"
            })
        }
        return res.status(200).json({
            message: "login successfull",
            user: {
                _id: user._id,
                Name: user.Name,
                Email: user.Email,
                Phone: user.Phone
            }
        })
    } catch (error) {
        console.log("error", error.message);
        return res.status(500).json({
            message: error.message
        })
    }
}

// patch method for register user
export const update_details = async (req, res) => {
    try {
        const userId = req.user._id;
        const { Name, Age, Email, Password, Phone } = req.body;
        const updateData = { Name, Age, Email, Phone }
        if (Password) {
            console.log(Password)
            const salt = await bcrypt.genSalt(10);
            updateData.Password = await bcrypt.hash(Password, salt)
        }
        const find_user = await user_model.findByIdAndUpdate(userId,
            { Name, Age, Email, Password, Phone },
            { new: true }
        )
        console.log(find_user)
        return res.json({
            message: "user details updated"
        })
    } catch (error) {
        console.log("erro", error.message);
        return res.status(500).json({
            error: "error",
            message: "an internal error"
        })
    }

}

// Delete register user 
export const Delete_user = async (req,res)=>{
    const userId = req.user._id;
    const find_user = await user_model.findByIdAndDelete(userId)
    if(!find_user){
        return res.status(400).json({
            message: "user not found"
        })
    }
    return res.json({
        message:"user deleted successfully"
    })

}

