const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();

// register controller
const postRegister = async (req, res) => {
  try {
    const result = await AuthServiceInstance.register(req.body);
    if (result) res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

//login controller
const postLogin = async (req, res) => {
  try {
    const { mobileNo, password } = req.body;
    const result = await AuthServiceInstance.login(mobileNo, password);
    if (result.isLoggedIn) {
      res.cookie("token", result.accessToken, {
        maxAge: 1300,
        httpOnly: true,
      });

      res.status(200).json(result);
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  postLogin,
  postRegister,
};
