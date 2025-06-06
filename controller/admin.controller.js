import jwt from "jsonwebtoken";
import AdminServices from "../services/admin.services.js";
import { hashPassword, emailValidation } from "../utils/index.js";
import  bcrypt from "bcrypt"

const adminServices = new AdminServices()

const createAdmin = async (req, res) => {
  try {
    const password = req.body.password;

    if (
      !req.body.firstName ||
      !req.body.LastName ||
      !req.body.email ||
      !password
    ) {
      return res.status(400).json({
        message: "Please provide all the fields",
        success: false,
        error: "Not fulfill the credentials",
      });
    }

    const hashedPass = await hashPassword(password);
    const admin = await adminServices.createAdmin({
      firstName: req.body.firstName,
      LastName: req.body.LastName,
      email: req.body.email.toLowerCase(),
      password: hashedPass,
    });
    return res.status(201).json({
      message: "Admin created successfully",
      success: true,
      data: admin,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

const getAdmin = async (req,res)=>{
  try {
    const admin = await adminServices.getAdmin(req.body.email.toLowerCase());
    if (!admin) { 
      return res.status(404).json({
        message: "Admin not found",
        success: false,
        error: "Admin not found",
      });
    }
    return res.status(200).json({
       message: "Admin fetched successfully",
      success: true,
      data: admin,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
}

 const loginAdmin = async(req, res)=>{
  try {
    const email = String(req.body.email)
    const password = String(req.body.password)
    if (!emailValidation(email)) {
          return res.status(500).json({
            message: "Email must be in valid format",
            success: false,
            err: "Not fullfill the credentials",
          });
        }

    const admin = await adminServices.loginAdmin(email)
    if (!admin) {
      return res.status(500).json({
        message: "User not found",
        success: false,
        err: "Not fullfill the credentials",
      });
    }
    const resp = await bcrypt.compare(password, admin.password)
     if (!resp) {
      return res.status(500).json({
        message: "Password is incorrect",
        success: false,
        err: "Not fullfill the credentials",
      });
    }

    const token = jwt.sign({ id : admin._id, role : admin.role},
      process.env.JWT_SECRET,
      { expiresIn: "24h"}
    )

    return res.status(200).json({
      message : "Admin logged in Successfully",
      data : admin,
      success : true,
      token : token
    })
    
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
}

export { createAdmin, getAdmin, loginAdmin };
