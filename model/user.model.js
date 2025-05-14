import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
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

    isVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    verificationToken : {
        type: String,
    },
    resetPasswordExpiry : {
        type : Date,
    }

  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema)

export default User;