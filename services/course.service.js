import CourseRepository from "../repository/course.repository.js";

class CourseService{
    constructor(){
        this.courseRepository = new CourseRepository()
    }

    async createCourse(data){
        try {
            const course = await this.courseRepository.createCourse(data)
        } catch (error) {
            console.error("Error in CourseService.createCourse:", error);
            throw error;
        }
    }

    async purchaseCourse(courseId) {
        try {
            const course = await this.courseRepository.purchaseCourse(courseId);
            return course;
        } catch (error) {
            console.error("Error in CourseService.purchaseCourse:", error);
            throw error;
        }
    }
}

export default CourseService;