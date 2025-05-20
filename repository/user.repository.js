import User from "../model/user.model.js";

class userRepository{

    async createUser(data){
        try {
            const user = await User.create(data)
            return user; 
        } catch (error) {
            console.log("Have some error in user repository");
            console.log(error);
            throw new Error("Internal server error");
        }
    }

    async getUser(email){
        try {
            
            const user = await User.findOne({email})
            return user;

        } catch (error) {
            console.log("Have some error in user repository");
            console.log(error);
            throw new Error("Internal server error");
            
        }
    }

    async getAllUsers(){
        try {
            const users = await User.find()
            return users;
        } catch (error) {
            console.log("Have some error in user repository");
            console.log(error);
            throw new Error("Internal server error");
        }
    }

    async verifyUser(token){
        try {
            const verifiedUser = await User.findOne({verificationToken : token})
            console.log(verifiedUser);
            
            return verifiedUser;
        } catch (error) {
            console.log("Have some error in user repository");
            console.log(error);
            throw new Error("Internal server error");
            
        }
    }
}

export default userRepository;