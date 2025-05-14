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
}

export default userRepository;