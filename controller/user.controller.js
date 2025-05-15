import { PassValidation } from "../utils/index.js";


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

     if(!PassValidation(pass)) {
      return res.status(500).json({
        message: "Password must be contain at least one uppercase letter",
        success: false,
        err: "Not fullfill the credentials",
      });
    }

  } catch (error) {
     console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}
export { registerUser };
