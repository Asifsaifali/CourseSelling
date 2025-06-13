import CourseService from "../services/course.service.js";
import User from "../model/user.model.js";
import Payment from "../model/payment.model.js";

const courseService = new CourseService();

const createCourse = async (req, res) => {
  try {
    if (!req.body.title || !req.body.description || !req.body.price) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const courseData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      instructor: req.body.instructor,
      category: req.body.category,
      level: req.body.level,
      language: req.body.language,
      duration: req.body.duration,
    };

    const course = await courseService.createCourse(courseData);
    return res.status(201).json({
      message: "New Course created successfully",
      data: course,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

const purchaseCourse = async (req, res) => {
  try {
    const courseId = req.body.courseId;
    const userId = req.user._id;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }
    const course = await courseService.purchaseCourse(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const paymentData = await Payment.findOne({ userId });
    if (!paymentData) {
      return res.status(404).json({ message: "Payment not found" });
    }
    if (paymentData.status === "Success") {
      const user = await User.findById(userId);
      if (user.enrolledCourses.includes(courseId)) {
        return res
          .status(400)
          .json({ message: "You have already enrolled in this course" });
      }
      user.enrolledCourses.push(courseId);
      await user.save();
      return res.status(200).json({
        message: "Course purchased successfully",
        data: course,
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error in course controller",
      error: error.message,
      success: false,
    });
  }
};

export { createCourse, purchaseCourse };
