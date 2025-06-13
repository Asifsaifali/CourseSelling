import jwt from "jsonwebtoken";
import Admin from "../model/admin.model.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const email = req.headers["email"];
    const password = req.headers["password"];
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({
      _id: decode.id,
      email: email,
      password: password,
    });

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Please login first to add a new Course" });
  }
};

export default adminMiddleware;
