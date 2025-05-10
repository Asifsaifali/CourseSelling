import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async ()=>{
  const conn = await mongoose.connect(process.env.MONGO_URI)
  if(conn){
    console.log(`MongoDB connected Successfully`);
  }else{
    console.log(`MongoDB connection failed`);
  }

}
export default connectDB;