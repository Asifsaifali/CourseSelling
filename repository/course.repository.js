import Course from "../model/course.model.js";

class CourseRepository{

    async createCourse(courseData) {
        try {
            const course = await Course.create(courseData);
            return course
        } catch (error) {
            console.error("Error creating course:", error);
            throw error;
        }
}
}


export default CourseRepository;