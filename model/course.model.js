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

    instructor:{
      type:String,
      default:"Asif saif ali"
    },
    category: {
      type: String,
      enum: ["Web Development", "Data Science", "Blockchain Development", "Full Stack Development","Backend Development","Frontend Development", "Others"]
    },
    level:{
      type:String,
      enum: ["Beginner", "Intermediate", "Advanced", "Beginner to Advanced"],
      default: "Beginner"
    },
    language:{
      type: String,
      default: "English"
    },
    duration:{
      type : String,
      required : true,
    },
    price: {
      type: Number,
      required: true,
      min: 0
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
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema)

export default Course