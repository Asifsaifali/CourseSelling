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
        }

        const course = await courseService.createCourse(courseData)
        return res.status(201).json({
            message: "Course created successfully",
            course: course
        })
    } catch (error) {
        
    }
}


export {createCourse}