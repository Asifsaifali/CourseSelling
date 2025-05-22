import userRepository from "../repository/user.repository.js";

class UserServices {
  constructor() {
    this.userRepo = new userRepository();
  }
  async createUser(data) {
    try {
      const user = await this.userRepo.createUser(data);
      return user;
    } catch (error) {
      console.log("Have some error in user repository");
      console.log(error);
      throw new Error("Internal server error");
    }
  }

  async getUser(email) {
    try {
      const user = await this.userRepo.getUser(email);
      return user;
    } catch (error) {
      console.log("Have some error in user repository");
      console.log(error);
      throw new Error("Internal server error");
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userRepo.getAllUsers();
      return users;
    } catch (error) {
      console.log("Have some error in user repository");
      console.log(error);
      throw new Error("Internal server error");
    }
  }

  async verifyUser(token){
    try {
      const verifiedUser = await this.userRepo.verifyUser(token);
      return verifiedUser;
    } catch (error) {
      console.log("Have some error in user repository");
      console.log(error);
      throw new Error("Internal server error");
    }
  }
}

export default UserServices;
