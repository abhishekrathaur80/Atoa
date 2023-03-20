const UserService = require("./user.service");
const userServiceIntance = new UserService();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

//business logic for signUP and login

class AuthService {
  //method for signUP
  register = async (data) => {
    const hasedPassword = await this.hashPassword(data.password);
    const result = await userServiceIntance.register({
      ...data,
      password: hasedPassword,
    });
    const accessToken = this.generateToken(result._id);
    const refreshToken = this.generateToken(result._id);
    l;
    return { result, accessToken, refreshToken };
  };

  //method for hashing the password
  hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hassedPassword = await bcrypt.hash(password, salt);
    return hassedPassword;
  };
  //login business logic
  login = async (mobileNo, password) => {
    const user = await userServiceIntance.findByMobileNo(mobileNo);
    if (!user) return { isLoggedIn: false };
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return {
        isLoggedIn: true,
        user,
        accessToken: this.generateToken(user._id, 300),
        refreshToken: this.generateToken(user._id),
      };
    } else {
      return { isLoggedIn: false };
    }
  };

  //method for generating tokens
  generateToken = (userId, expiresIn = null) => {
    const payload = { userId };
    const options = expiresIn ? { expiresIn } : {};
    const token = jwt.sign(payload, secret, options);
    return token;
  };

  //method for validating tokens
  validToken = (token) => {
    try {
      jwt.verify(token, secret);
      return true;
    } catch (err) {
      return false;
    }
  };
}

module.exports = AuthService;
