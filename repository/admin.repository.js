import Admin from "../model/admin.model.js";

class AdminRepository{

    async createAdmin(data){
        try {
            const admin = await Admin.create(data)
            console.log("Admin created successfully:", admin);
            return admin;
        } catch (error) {
            console.log("Error in creating admin:");
            throw new Error("Error in creating admin");
        }
    }
}

export default AdminRepository;