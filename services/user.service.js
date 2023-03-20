const User = require("../model/user.model");

class UserService {
  register = async (user) => {
    try {
      const { name, email, password, mobileNo } = user;
      const newUser = new User({ name, email, password, mobileNo });
      const result = await newUser.save();
      return result;
    } catch (error) {
      throw error;
    }
  };

  findByMobileNo = async (mobileNo) => {
    try {
      const userResult = await User.findOne({ mobileNo });
      return userResult;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UserService;
