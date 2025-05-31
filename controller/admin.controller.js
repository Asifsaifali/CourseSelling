import AdminServices from "../services/admin.services.js";
import { hashPassword } from "../utils/index.js";

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
    const admin = await adminServices.getAdmin(email)
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

export { createAdmin };
