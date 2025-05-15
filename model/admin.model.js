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
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admi", AdminSchema);

export default Admin;
