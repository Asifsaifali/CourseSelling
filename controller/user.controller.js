import {
  PassValidation,
  emailValidation,
  hashPassword,
} from "../utils/index.js";
import userRepository from "../repository/user.repository.js";

const userRepo = new userRepository();
const registerUser = async (req, res) => {
  try {
    const pass = String(req.body.password);
    if (pass.length <= 5 && pass.length < 15) {
      return res.status(500).json({
        message: "Password must be greater than 5 characters ",
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
    const email = String(req.body.email);
    if (!emailValidation(email)) {
      return res.status(500).json({
        mesasge: "Email must be in valid format",
        success: false,
        err: "Not fullfill the credentials",
      });
    }

    const existUser = await userRepo.getUser(email)
    if(existUser){
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

    const user = await userRepo.createUser({
      name: req.body.name,
      email: req.body.email,
      phone : req.body.phone,
      password: hashedPass,
    });
    if (!user) {
      return res.status(500).json({
        message: "User not created",
        success: false,
        err: "Not fullfill the credentials",
      });
    }
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
export { registerUser };
