import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
  {
    userId: ObjectId,
    courseId: ObjectId,
  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", PurchaseSchema);

export default Purchase;
