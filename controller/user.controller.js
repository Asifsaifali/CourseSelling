import {
  PassValidation,
  emailValidation,
  hashPassword,
} from "../utils/index.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import UserServices from "../services/user.services.js";
const userServices = new UserServices();
const registerUser = async (req, res) => {
  try {
    const pass = String(req.body.password);
    const email = String(req.body.email);
    if (pass.length <= 5 && pass.length < 15) {
      return res.status(500).json({
        message: "Password must be greater than 5 characters ",
        success: false,
        err: "Not fullfill the credentials",
      });
    }

    if (!req.body.name || !email || !req.body.phone || !pass) {
      return res.status(500).json({
        message: "Please provide all the fields",
        success: false,
        err: "Not fullfill the credentials",
      });
    }
    if (!PassValidation(pass)) {
      return res.status(500).json({
        message: "Password must be contain at least one uppercase letter",
        success: false,
        err: "Not fullfill the credentials",
      });
    }

    if (!emailValidation(email)) {
      return res.status(500).json({
        mesasge: "Email must be in valid format",
        success: false,
        err: "Not fullfill the credentials",
      });
    }

    const existUser = await userServices.getUser(email);
    if (existUser) {
      return res.status(500).json({
        message: "User already exist registered with another email",
        success: false,
        err: "Not fullfill the credentials",
      });
    }

    const hashedPass = await hashPassword(pass);
    const phone = String(req.body.phone);
    if (phone.length !== 10) {
      return res.status(500).json({
        message: "Phone number must be 10 digits",
        success: false,
        err: "Not fullfill the credentials",
      });
    }

    const user = await userServices.createUser({
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      phone: req.body.phone,
      password: hashedPass,
    });
    if (!user) {
      return res.status(500).json({
        message: "User not created",
        success: false,
        err: "Not fullfill the credentials",
      });
    }
    const token = crypto.randomBytes(32).toString("hex");
    user.verificationToken = token;
    await user.save();
    return res.status(200).json({
      message: "User created successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const email = String(req.body.email);
    const pass = String(req.body.password);
    if (!emailValidation(email)) {
      return res.status(500).json({
        message: "Email must be in valid format",
        success: false,
        err: "Not fullfill the credentials",
      });
    }
    const user = await userServices.getUser(email);
    if (!user) {
      return res.status(500).json({
        message: "User not found",
        success: false,
        err: "Not fullfill the credentials",
      });
    }
    const resp = await bcrypt.compare(pass, user.password);
    if (!resp) {
      return res.status(500).json({
        message: "Password is incorrect",
        success: false,
        err: "Not fullfill the credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const { password, ...userWithoutPassword } = user._doc; // Exclude password from the response
    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      data: userWithoutPassword,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const email = String(req.body.email);
    const user = await userServices.getUser(email);
    if (!user) {
      return res.status(500).json({
        message: "User not found",
        success: false,
        err: "Not fullfill the credentials",
      });
    }
    res.status(200).json({
      message: "User fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userServices.getAllUsers();
    if (!users) {
      return res.status(500).json({
        message: "User not found",
        success: false,
        err: "Not fullfill the credentials",
      });
    }
    res.status(200).json({
      message: "All users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const verifyUser = async(req, res)=>{
  try {
    const  { token }  = req.params;
    console.log(token);
    
    const user = await userServices.verifyUser(token)
    if(!user){
      return res.status(500).json({
        message: "User not found",
        success: false,
        err: "Not fullfill the credentials",
      });
    }
    user.isVerified = true
    user.verificationToken = undefined
    await user.save()
    return res.status(200).json({
      message: "User verified successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

const viewAllCourses = async(req,res)=>{
  try {
    const userId = req.user._id;
    const user = await userServices.viewAllCourses(userId);
    if (!user) {
      return res.status(500).json({
        message: "User not found",
        success: false,
        err: "Not fullfill the credentials",
      });
    }
    res.status(200).json({
      message: "All courses fetched successfully",
      success: true,
      data: (await user.populate("enrolledCourses")).enrolledCourses,
    }); 

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
    
  }
}
export { registerUser, loginUser, getUserByEmail, getAllUsers, verifyUser, viewAllCourses };
