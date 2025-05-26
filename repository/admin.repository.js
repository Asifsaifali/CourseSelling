import Admin from "../model/admin.model.js";

class AdminRepository{

    async createAdmin(data){
        try {
            const admin = await Admin.create(data)
            return admin;
        } catch (error) {
            console.log("Error in creating admin:", error);
            throw new Error("Error in creating admin");
        }
    }
}

export default AdminRepository;