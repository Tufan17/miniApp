const express = require("express");
const authenticate = require("../middleware/authenticate")
const {createValidation,updateValidation} = require("../validations/UserValidation");
const UserController = require("../controllers/UserController");
const authorized = require("../middleware/authorized")
const validate = require("../middleware/validate")
const userController = new UserController();

const router = express.Router()


router.get("/",authenticate,authorized,userController.findUsers)
router.get("/:id",authenticate,userController.findUserById)

router.post("/",authenticate,authorized,validate(createValidation), userController.createUser)

router.put("/:id",authenticate,authorized,validate(updateValidation),userController.updateUser)

router.delete("/:id",authenticate,authorized,userController.deleteUser)


module.exports = router