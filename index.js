import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors({
    origin:"localhost:3000",
    methods:["GET", "POST", "PUT", "DELLETE"],
    allowedHeaders:["Content-type", "Authorization"],
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
})