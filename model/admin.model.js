import mongoose from "mongoose";
const AdminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    LastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified:{
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "admin"
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
