const express = require("express");
const authenticate = require("../middleware/authenticate")
const AuthService = require("../services/AuthServices");
const {loginValidation,registerValidation} = require("../validations/AuthValidation")
const validation = require("../middleware/validate")
const router = express.Router();

router.post("/login",validation(loginValidation),AuthService.loginUser)
router.post("/login/nickname",validation(loginValidation),AuthService.loginNicknameUser)
router.post("/register",validation(registerValidation),AuthService.registerUser)
router.post("/logout",authenticate,AuthService.logoutUser)

module.exports = router