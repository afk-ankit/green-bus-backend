const express = require("express");
const { userController } = require("../../controllers");
const {
  validateUserRegistration,
  validateUserLogin,
} = require("../../middleware/User/userValidation");
const router = express.Router();

router.post("/register", validateUserRegistration, userController.registerUser);

router.post("/login", validateUserLogin, userController.loginUser);
module.exports = router;
