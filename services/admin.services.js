import AdminRepository from "../repository/admin.repository.js";

class AdminServices{
    constructor(){
        this.adminRepository = new AdminRepository()
    }

    async createAdmin(data){
        try {
            const admin = await this.adminRepository.createAdmin(data)
            return admin;
        } catch (error) {
            console.log("Error in creating admin:", error);
            throw new Error("Error in creating admin");
        }
    }
}

export default AdminServices;