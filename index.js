import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/server.js";

const app = express();
const PORT = process.env.PORT ||  8000;

dotenv.config();

app.use(cors({
    origin:"localhost:3000",
    methods:["GET", "POST", "PUT", "DELLETE"],
    allowedHeaders:["Content-type", "Authorization"],
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

   connectDB() 


app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
})