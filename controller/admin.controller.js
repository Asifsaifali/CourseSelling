import UserServices from "../services/user.services.js";
import { hashPassword } from "../utils/index.js";
const userServices = new UserServices();

const createAdmin =async(req,res)=>{
    try {
        const { firstName, LastName, email, password } = req.body

        if(!firstName || !LastName || !email || !password){
            return res.status(400).json({
                message: "Please provide all the fields",
                success: false,
                error: "Not fulfill the credentials"
            })
        }
        const hashedPass = await hashPassword(password);
        const admin = await userServices.createUser({
            firstName: firstName,
            LastName: LastName,
            email: email.toLowerCase(),
            password: hashedPass
        })
        return res.status(201).json({
            message: "Admin created successfully",
            success: true,
            data: admin
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        })
    }
}

export { createAdmin}