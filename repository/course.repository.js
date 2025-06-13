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

async purchaseCourse(courseId){
    try {
        const course = await Course.findById(courseId)
        if (!course) {
            throw new Error("Course not found");
        }
        return course;
    } catch (error) {
        console.error("Error purchasing course:", error);
        throw error;
    }
}
}


export default CourseRepository;