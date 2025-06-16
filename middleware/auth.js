import jwt from "jsonwebtoken"
import User from "../model/user.model.js"
import Course from "../model/course.model.js";

const userMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ 
      success : false,
      error: "Please login first or provide a valid token",
        message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
       return res.status(400).json({ message: "Invalid token" });

    }
    const email = req.headers["email"]
    const password = req.headers["password"];
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({
      email: email
    });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Intenal Server error in user middleware" });
  }
};

const courseMiddleware = async (req, res, next) => {
  try {
  const courseId = req.headers["courseid"] || req.body.courseId;
  if (!courseId) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  const course = await Course.findOne({_id : courseId})
  if(!course){
    res.status.json({
      message: "Course not found in the database"
    })
  }
    req.course = course;
    next();
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error in Course middleware" });
  }
}

export { userMiddleware, courseMiddleware };
