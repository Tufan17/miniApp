const express = require("express");
const authenticate = require("../middleware/authenticate")
const UserLevelController = require("../controllers/UserLevelController");
const {createValidation, updateValidation } = require("../validations/UserLevelValidation.js")
const validate = require("../middleware/validate")
const router = express.Router();






router.get("/",authenticate,UserLevelController.findAll)
router.get("/:id",authenticate,UserLevelController.findById)
router.post("/",authenticate,validate(createValidation),UserLevelController.create)

module.exports = router