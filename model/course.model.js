import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },
    creatorId: ObjectId,
    imageUrl: String,
  },
  { timeseries: true }
);

const Course = mongoose.model("Course", CourseSchema)

export default Course