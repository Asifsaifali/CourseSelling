import CourseService from "../services/course.service.js"
import Admin from "../model/admin.model.js";

const courseService = new CourseService();

const createCourse = async(req, res)=>{
    try {
        if(!req.body.title || !req.body.description || !req.body.price) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const courseData = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            instructor : req.body.instructor,
            category : req.body.category,
            level : req.body.level,
            language : req.body.language,
            duration : req.body.duration
        }

        const course = await courseService.createCourse(courseData)
        return res.status(201).json({
            message: "New Course created successfully",
            data: course,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false
        })
    }
}


export {createCourse}