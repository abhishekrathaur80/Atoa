const express = require("express");
const router = express.Router();
const { userValidationSchema } = require("../validation/user.validator");
const { loginValidationSchema } = require("../validation/auth.validation");

const { validateSchema } = require("../middleware/validate.middleware");

const { postRegister, postLogin } = require("../controller/auth.controller");
const validateUserRequestMiddleware = validateSchema(userValidationSchema);
const loginBodyValidatorMiddleware = validateSchema(loginValidationSchema);

//signup router
router.post("/register", validateUserRequestMiddleware, postRegister);

//login router
router.post("/login", loginBodyValidatorMiddleware, postLogin);

module.exports = router;
