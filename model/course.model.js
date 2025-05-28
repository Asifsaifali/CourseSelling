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
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    imageUrl: {
      type: String,
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe1AN3kSvzRBWzP4hbcagzKGyTgEKI8tKPTg&s",
    },
  },
  { timeseries: true }
);

const Course = mongoose.model("Course", CourseSchema)

export default Course